"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const rich_text_1 = require("@lexical/rich-text");
const generate_id_1 = __importDefault(require("../../utils/generate-id"));
module.exports = {
    export(node, options, exportChildren) {
        if (!(0, rich_text_1.$isHeadingNode)(node)) {
            return null;
        }
        const tag = node.getTag();
        const id = (0, generate_id_1.default)(node.getTextContent(), options);
        return `<${tag} id="${id}">${exportChildren(node)}</${tag}>`;
    }
};
//# sourceMappingURL=heading.js.map