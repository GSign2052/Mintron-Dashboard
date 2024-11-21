"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const headless_1 = require("@lexical/headless");
const list_1 = require("@lexical/list");
const rich_text_1 = require("@lexical/rich-text");
const link_1 = require("@lexical/link");
const convert_to_html_string_1 = __importDefault(require("./convert-to-html-string"));
const get_dynamic_data_nodes_1 = __importDefault(require("./get-dynamic-data-nodes"));
// TODO: Using import causes circular definitions for kg-default-nodes
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { registerRemoveAtLinkNodesTransform } = require('@tryghost/kg-default-transforms');
function defaultOnError() {
    // do nothing
}
class LexicalHTMLRenderer {
    dom;
    nodes;
    onError;
    constructor({ dom, nodes, onError } = {}) {
        if (!dom) {
            // eslint-disable-next-line @typescript-eslint/no-var-requires
            const jsdom = require('jsdom');
            const { JSDOM } = jsdom;
            this.dom = new JSDOM();
        }
        else {
            this.dom = dom;
        }
        this.nodes = nodes || [];
        this.onError = onError || defaultOnError;
    }
    async render(lexicalState, userOptions = {}) {
        const defaultOptions = {
            target: 'html',
            dom: this.dom
        };
        const options = Object.assign({}, defaultOptions, userOptions);
        const DEFAULT_NODES = [
            rich_text_1.HeadingNode,
            list_1.ListNode,
            list_1.ListItemNode,
            rich_text_1.QuoteNode,
            link_1.LinkNode,
            ...this.nodes
        ];
        const editor = (0, headless_1.createHeadlessEditor)({
            nodes: DEFAULT_NODES,
            onError: this.onError
        });
        const editorState = editor.parseEditorState(lexicalState);
        // gather nodes that require dynamic data
        const dynamicDataNodes = (0, get_dynamic_data_nodes_1.default)(editorState);
        // fetch dynamic data
        const renderData = new Map();
        await Promise.all(dynamicDataNodes.map(async (node) => {
            if (!node.getDynamicData) {
                return;
            }
            const { key, data } = await node.getDynamicData(options);
            renderData.set(key, data);
        }));
        options.renderData = renderData;
        // set up editor with our state
        editor.setEditorState(editorState);
        // register transforms that clean up state for rendering
        registerRemoveAtLinkNodesTransform(editor);
        // render
        let html = '';
        editor.update(async () => {
            html = (0, convert_to_html_string_1.default)(options);
        });
        return html;
    }
}
exports.default = LexicalHTMLRenderer;
//# sourceMappingURL=LexicalHTMLRenderer.js.map