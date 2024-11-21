"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const lexical_1 = require("lexical");
const link_1 = require("@lexical/link");
const kg_default_nodes_1 = require("@tryghost/kg-default-nodes");
const TextContent_1 = __importDefault(require("./utils/TextContent"));
const transformers_1 = __importDefault(require("./transformers"));
function $convertToHtmlString(options = {}) {
    const output = [];
    const children = (0, lexical_1.$getRoot)().getChildren();
    options.usedIdAttributes = options.usedIdAttributes || {};
    for (const child of children) {
        const result = exportTopLevelElementOrDecorator(child, options);
        if (result !== null) {
            output.push(result);
        }
    }
    // Koenig keeps a blank paragraph at the end of a doc but we want to
    // make sure it doesn't get rendered
    const lastChild = children[children.length - 1];
    if (lastChild && (0, lexical_1.$isParagraphNode)(lastChild) && lastChild.getTextContent().trim() === '') {
        output.pop();
    }
    return output.join('');
}
exports.default = $convertToHtmlString;
function exportTopLevelElementOrDecorator(node, options) {
    if ((0, kg_default_nodes_1.$isKoenigCard)(node)) {
        // NOTE: kg-default-nodes appends type in rare cases to make use of this functionality... with moving to typescript,
        //  we should change this implementation because it's confusing, or we should override the DOMExportOutput type
        const { element, type } = node.exportDOM(options);
        switch (type) {
            case 'inner':
                return element.innerHTML;
            case 'value':
                if ('value' in element) {
                    return element.value;
                }
                return '';
            default:
                return element.outerHTML;
        }
    }
    if ((0, lexical_1.$isElementNode)(node)) {
        // note: unsure why this type isn't being picked up from the import
        for (const transformer of transformers_1.default) {
            if (transformer.export !== null) {
                const result = transformer.export(node, options, _node => exportChildren(_node, options));
                if (result !== null) {
                    return result;
                }
            }
        }
    }
    return (0, lexical_1.$isElementNode)(node) ? exportChildren(node, options) : null;
}
function exportChildren(node, options) {
    const output = [];
    const children = node.getChildren();
    const textContent = new TextContent_1.default(exportChildren, options);
    for (const child of children) {
        if (!textContent.isEmpty() && !(0, lexical_1.$isLineBreakNode)(child) && !(0, lexical_1.$isTextNode)(child) && !(0, link_1.$isLinkNode)(child)) {
            output.push(textContent.render());
            textContent.clear();
        }
        if ((0, lexical_1.$isLineBreakNode)(child) || (0, lexical_1.$isTextNode)(child) || (0, link_1.$isLinkNode)(child)) {
            textContent.addNode(child);
        }
        else if ((0, lexical_1.$isElementNode)(child)) {
            output.push(exportChildren(child, options));
        }
    }
    if (!textContent.isEmpty()) {
        output.push(textContent.render());
    }
    return output.join('');
}
//# sourceMappingURL=convert-to-html-string.js.map