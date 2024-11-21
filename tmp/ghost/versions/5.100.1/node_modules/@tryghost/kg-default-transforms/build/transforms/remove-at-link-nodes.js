"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeAtLinkNodesTransform = removeAtLinkNodesTransform;
exports.registerRemoveAtLinkNodesTransform = registerRemoveAtLinkNodesTransform;
const lexical_1 = require("lexical");
const kg_default_nodes_1 = require("@tryghost/kg-default-nodes");
// used when rendering to make sure we're not rendering the temporary
// nodes used for searching internal links
function removeAtLinkNodesTransform(node) {
    const prevSibling = node.getPreviousSibling();
    const nextSibling = node.getNextSibling();
    // Remove a surrounding space if it exists to avoid double-spacing after removal
    // AtLink nodes should always exist surrounded by spaces unless at beginning or end of text
    if (prevSibling) {
        if ((0, lexical_1.$isTextNode)(prevSibling) && prevSibling.getTextContent().endsWith(' ')) {
            prevSibling.setTextContent(prevSibling.getTextContent().slice(0, -1));
        }
    }
    else if (nextSibling) {
        if ((0, lexical_1.$isTextNode)(nextSibling) && nextSibling.getTextContent().startsWith(' ')) {
            nextSibling.setTextContent(nextSibling.getTextContent().slice(1));
        }
    }
    node.remove();
}
function registerRemoveAtLinkNodesTransform(editor) {
    if (editor.hasNodes([kg_default_nodes_1.AtLinkNode])) {
        return editor.registerNodeTransform(kg_default_nodes_1.AtLinkNode, removeAtLinkNodesTransform);
    }
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    return () => { };
}
//# sourceMappingURL=remove-at-link-nodes.js.map