"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.htmlToLexical = htmlToLexical;
/* eslint-disable ghost/filenames/match-exported-class */
const lexical_1 = require("lexical");
const headless_1 = require("@lexical/headless");
const html_1 = require("@lexical/html");
const clipboard_1 = require("@lexical/clipboard");
const rich_text_1 = require("@lexical/rich-text");
const list_1 = require("@lexical/list");
const link_1 = require("@lexical/link");
const kg_default_nodes_1 = require("@tryghost/kg-default-nodes");
const jsdom_1 = require("jsdom");
const kg_default_transforms_1 = require("@tryghost/kg-default-transforms");
const EMPTY_PARAGRAPH = {
    children: [],
    direction: null,
    format: '',
    indent: 0,
    type: 'paragraph',
    version: 1
};
const BLANK_DOCUMENT = {
    root: {
        children: [EMPTY_PARAGRAPH],
        direction: null,
        format: '',
        indent: 0,
        type: 'root',
        version: 1
    }
};
const defaultNodes = [
    // basic HTML nodes
    rich_text_1.HeadingNode,
    link_1.LinkNode,
    list_1.ListItemNode,
    list_1.ListNode,
    rich_text_1.QuoteNode,
    // Koenig nodes
    ...kg_default_nodes_1.DEFAULT_NODES
];
function htmlToLexical(html, options) {
    if (!html) {
        return BLANK_DOCUMENT;
    }
    const defaultEditorConfig = {
        nodes: defaultNodes,
        html: kg_default_nodes_1.DEFAULT_CONFIG.html
    };
    const editorConfig = Object.assign({}, defaultEditorConfig, options?.editorConfig);
    const dom = new jsdom_1.JSDOM(`<body>${html?.trim()}</body>`);
    const editor = (0, headless_1.createHeadlessEditor)(editorConfig);
    (0, kg_default_transforms_1.registerDefaultTransforms)(editor);
    editor.update(() => {
        // add a paragraph to avoid insertNodes throwing errors
        const paragraph = (0, lexical_1.$createParagraphNode)();
        (0, lexical_1.$getRoot)().append(paragraph);
        const nodes = (0, html_1.$generateNodesFromDOM)(editor, dom.window.document);
        // use @lexical/clipboard as it has additional logic for normalizing nodes
        const selection = (0, lexical_1.$getRoot)().select();
        (0, clipboard_1.$insertGeneratedNodes)(editor, nodes, selection);
        // clean up the original empty paragraph
        paragraph.remove();
    }, { discrete: true });
    const editorState = editor.getEditorState();
    return editorState.toJSON();
}
//# sourceMappingURL=html-to-lexical.js.map