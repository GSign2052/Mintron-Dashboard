"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const lexical_1 = require("lexical");
const kg_default_nodes_1 = require("@tryghost/kg-default-nodes");
function getDynamicDataNodes(editorState) {
    const dynamicNodes = [];
    editorState.read(() => {
        const root = (0, lexical_1.$getRoot)();
        const nodes = root.getChildren();
        nodes.forEach((node) => {
            if ((0, kg_default_nodes_1.$isKoenigCard)(node) && node.hasDynamicData?.()) {
                dynamicNodes.push(node);
            }
        });
    });
    return dynamicNodes;
}
exports.default = getDynamicDataNodes;
//# sourceMappingURL=get-dynamic-data-nodes.js.map