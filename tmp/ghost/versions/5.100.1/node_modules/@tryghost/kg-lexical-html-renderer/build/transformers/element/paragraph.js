"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const lexical_1 = require("lexical");
module.exports = {
    export(node, options, exportChildren) {
        if (!(0, lexical_1.$isParagraphNode)(node)) {
            return null;
        }
        return `<p>${exportChildren(node)}</p>`;
    }
};
//# sourceMappingURL=paragraph.js.map