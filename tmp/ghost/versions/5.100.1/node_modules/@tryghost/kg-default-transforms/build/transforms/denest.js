"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.denestTransform = denestTransform;
exports.registerDenestTransform = registerDenestTransform;
const list_1 = require("@lexical/list");
const lexical_1 = require("lexical");
// Through pasting content or converting from HTML in the API (ultimately the same path as pasting)
// it's possible for the editor to end up with nested element nodes. Situations we've seen:
// - headers inside paragraphs
// - image decorator nodes inside paragraphs
// - image decorator nodes inside lists/list items
// - large swathes of content nested inside a paragraph/heading node
// - etc.
//
// This invalid nesting causes numerous issues inside the editor as we only support our "card"
// decorator nodes at the top-level meaning selection, deletion, etc gets very confused when nested.
// Our renderer is also not designed to handle nested element nodes meaning things may _look_ fine
// in the editor but not render correctly or not render at all.
//
// With this transform we attempt to detect and fix invalid nesting by pulling out any non-inline
// children from the passed-in node and inserting them after the node's top-level parent. We need
// to move the nested nodes rather than remove them so we don't lose any pasted/imported content.
// lists can only be top-level or nested inside list items
function $isInvalidListNode(node) {
    if (!(0, list_1.$isListNode)(node)) {
        return false;
    }
    const parent = node.getParent();
    return !((0, lexical_1.$isRootNode)(parent) || (0, list_1.$isListItemNode)(parent));
}
// list items can only exist within a list node
function $isInvalidListItemNode(node) {
    if (!(0, list_1.$isListItemNode)(node)) {
        return false;
    }
    const parent = node.getParent();
    return !(0, list_1.$isListNode)(parent);
}
// non-inline nodes can only exist at top-level inside a root node
// ignore list and list item nodes because they aren't inline but can be nested inside each other
function $isInvalidChildNode(node) {
    if ((0, lexical_1.$isLineBreakNode)(node) || (0, lexical_1.$isTextNode)(node)) { // line break and text nodes don't have an isInline method
        return false;
    }
    return $isInvalidListNode(node)
        || $isInvalidListItemNode(node)
        || node.isInline && !node.isInline() && !(0, list_1.$isListNode)(node) && !(0, list_1.$isListItemNode)(node);
}
function denestTransform(node, createNode) {
    const children = node.getChildren();
    const hasInvalidChild = children.some($isInvalidChildNode);
    if (!hasInvalidChild) {
        return;
    }
    // we need a temporary detached node to hold any moved nodes otherwise
    // we can trigger an infinite loop with the transform continually
    // re-running on each child move
    const tempParagraph = (0, lexical_1.$createParagraphNode)();
    // we need a new node of the current node type to collect inline
    // children so we can maintain order when moving the non-inline children
    // out. Will be appended to the temp paragraph and the var replaced with a
    // new node each time we find a non-inline child
    let currentElementNode = createNode(node);
    // pull any non-inline children out into the temp paragraph
    children.forEach((child) => {
        if ($isInvalidChildNode(child)) {
            if (currentElementNode.getChildrenSize() > 0) {
                tempParagraph.append(currentElementNode);
                currentElementNode = createNode(node);
            }
            tempParagraph.append(child);
        }
        else {
            currentElementNode.append(child);
        }
    });
    // append any remaining nodes from the current element node holder
    if (currentElementNode.getChildrenSize() > 0) {
        tempParagraph.append(currentElementNode);
    }
    // find the top-level parent to insert nodes after in case of deeper nesting,
    // e.g. images inside lists
    let parent = node;
    while (parent.getParent() && parent.getParent() !== (0, lexical_1.$getRoot)()) {
        parent = parent.getParentOrThrow();
    }
    // reverse order because we can only insertAfter the parent node
    // meaning first child needs to be inserted last to maintain order.
    tempParagraph.getChildren().reverse().forEach((child) => {
        // ensure we don't add list items directly into root node
        // TODO: can we handle this elsewhere/more generically?
        if ((0, lexical_1.$isRootNode)(parent.getParent()) && (0, list_1.$isListItemNode)(child)) {
            const paragraphNode = (0, lexical_1.$createParagraphNode)();
            paragraphNode.append(...child.getChildren());
            child.remove();
            parent.insertAfter(paragraphNode);
            return;
        }
        parent.insertAfter(child);
    });
    // remove the original node - it's now empty
    node.remove();
    // clean up the temporary detached paragraph immediately as we know it's no longer needed
    tempParagraph.remove();
}
function registerDenestTransform(editor, klass, createNode) {
    if (editor.hasNodes([klass])) {
        return editor.registerNodeTransform(klass, (node) => {
            denestTransform(node, createNode);
        });
    }
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    return () => { };
}
//# sourceMappingURL=denest.js.map