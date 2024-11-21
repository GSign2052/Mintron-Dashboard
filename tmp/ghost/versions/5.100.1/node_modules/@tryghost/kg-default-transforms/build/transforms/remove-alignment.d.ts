import { ElementNode, Klass, LexicalEditor } from 'lexical';
export declare function removeAlignmentTransform(node: ElementNode): void;
export declare function registerRemoveAlignmentTransform<T extends ElementNode>(editor: LexicalEditor, klass: Klass<T>): () => void;
