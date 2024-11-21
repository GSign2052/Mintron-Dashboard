"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mergeListNodesTransform = mergeListNodesTransform;
exports.registerMergeListNodesTransform = registerMergeListNodesTransform;
const list_1 = require("@lexical/list");
function mergeListNodesTransform(node) {
    const nextSibling = node.getNextSibling();
    if ((0, list_1.$isListNode)(nextSibling) && (0, list_1.$isListNode)(node) && nextSibling.getListType() === node.getListType()) {
        node.append(...nextSibling.getChildren());
        nextSibling.remove();
    }
}
function registerMergeListNodesTransform(editor) {
    if (editor.hasNodes([list_1.ListNode])) {
        return editor.registerNodeTransform(list_1.ListNode, mergeListNodesTransform);
    }
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    return () => { };
}
//# sourceMappingURL=merge-list-nodes.js.map