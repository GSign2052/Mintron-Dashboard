"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeAlignmentTransform = removeAlignmentTransform;
exports.registerRemoveAlignmentTransform = registerRemoveAlignmentTransform;
function removeAlignmentTransform(node) {
    // on element nodes format===text-align in Lexical
    if (node.getFormatType() !== '') {
        node.setFormat('');
    }
}
function registerRemoveAlignmentTransform(editor, klass) {
    if (editor.hasNodes([klass])) {
        return editor.registerNodeTransform(klass, removeAlignmentTransform);
    }
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    return () => { };
}
//# sourceMappingURL=remove-alignment.js.map