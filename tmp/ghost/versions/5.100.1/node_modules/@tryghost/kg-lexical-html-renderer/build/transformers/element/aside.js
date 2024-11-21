"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const kg_default_nodes_1 = require("@tryghost/kg-default-nodes");
module.exports = {
    export(node, options, exportChildren) {
        if (!(0, kg_default_nodes_1.$isAsideNode)(node)) {
            return null;
        }
        if (options.target === 'email') {
            let children = exportChildren(node);
            if (!children.startsWith('<p>')) {
                children = `<p>${children}</p>`;
            }
            return `<blockquote class="kg-blockquote-alt">${children}</blockquote>`;
        }
        return `<blockquote class="kg-blockquote-alt">${exportChildren(node)}</blockquote>`;
    }
};
//# sourceMappingURL=aside.js.map