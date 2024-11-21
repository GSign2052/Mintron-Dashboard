"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerDefaultTransforms = registerDefaultTransforms;
const denest_js_1 = require("./transforms/denest.js");
const remove_alignment_js_1 = require("./transforms/remove-alignment.js");
const utils_1 = require("@lexical/utils");
const lexical_1 = require("lexical");
const rich_text_1 = require("@lexical/rich-text");
const kg_default_nodes_1 = require("@tryghost/kg-default-nodes");
const list_1 = require("@lexical/list");
const merge_list_nodes_js_1 = require("./transforms/merge-list-nodes.js");
__exportStar(require("./transforms/denest.js"), exports);
__exportStar(require("./transforms/merge-list-nodes.js"), exports);
__exportStar(require("./transforms/remove-alignment.js"), exports);
// only used when rendering so not registered by default
__exportStar(require("./transforms/remove-at-link-nodes.js"), exports);
function registerDefaultTransforms(editor) {
    return (0, utils_1.mergeRegister)(
    // strip unwanted alignment formats
    (0, remove_alignment_js_1.registerRemoveAlignmentTransform)(editor, lexical_1.ParagraphNode), (0, remove_alignment_js_1.registerRemoveAlignmentTransform)(editor, rich_text_1.HeadingNode), (0, remove_alignment_js_1.registerRemoveAlignmentTransform)(editor, kg_default_nodes_1.ExtendedHeadingNode), (0, remove_alignment_js_1.registerRemoveAlignmentTransform)(editor, rich_text_1.QuoteNode), 
    // fix invalid nesting of nodes
    (0, denest_js_1.registerDenestTransform)(editor, lexical_1.ParagraphNode, () => ((0, lexical_1.$createParagraphNode)())), (0, denest_js_1.registerDenestTransform)(editor, rich_text_1.HeadingNode, node => ((0, rich_text_1.$createHeadingNode)(node.getTag()))), (0, denest_js_1.registerDenestTransform)(editor, kg_default_nodes_1.ExtendedHeadingNode, (node) => ((0, rich_text_1.$createHeadingNode)(node.getTag()))), (0, denest_js_1.registerDenestTransform)(editor, rich_text_1.QuoteNode, () => ((0, rich_text_1.$createQuoteNode)())), (0, denest_js_1.registerDenestTransform)(editor, list_1.ListNode, node => ((0, list_1.$createListNode)(node.getListType(), node.getStart()))), (0, denest_js_1.registerDenestTransform)(editor, list_1.ListItemNode, () => ((0, list_1.$createListItemNode)())), 
    // merge adjacent lists of the same type
    (0, merge_list_nodes_js_1.registerMergeListNodesTransform)(editor));
}
//# sourceMappingURL=default-transforms.js.map