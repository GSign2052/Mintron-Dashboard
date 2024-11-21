"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const rich_text_1 = require("@lexical/rich-text");
module.exports = {
    export(node, options, exportChildren) {
        if (!(0, rich_text_1.$isQuoteNode)(node)) {
            return null;
        }
        if (options.target === 'email') {
            let children = exportChildren(node);
            if (!children.startsWith('<p>')) {
                children = `<p>${children}</p>`;
            }
            return `<blockquote>${children}</blockquote>`;
        }
        return `<blockquote>${exportChildren(node)}</blockquote>`;
    }
};
//# sourceMappingURL=blockquote.js.map