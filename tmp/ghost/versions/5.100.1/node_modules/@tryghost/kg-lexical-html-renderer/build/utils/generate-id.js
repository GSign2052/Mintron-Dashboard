"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const kg_utils_1 = require("@tryghost/kg-utils");
function generateId(text, options) {
    if (!options.usedIdAttributes) {
        options.usedIdAttributes = {};
    }
    const id = (0, kg_utils_1.slugify)(text, options);
    let deduplicatedId = id;
    if (options.usedIdAttributes[id] !== undefined) {
        deduplicatedId += `-${options.usedIdAttributes[id]}`;
        options.usedIdAttributes[id] += 1;
    }
    else {
        options.usedIdAttributes[id] = 1;
    }
    return deduplicatedId;
}
exports.default = generateId;
//# sourceMappingURL=generate-id.js.map