import { LexicalEditor } from 'lexical';
export * from './transforms/denest.js';
export * from './transforms/merge-list-nodes.js';
export * from './transforms/remove-alignment.js';
export * from './transforms/remove-at-link-nodes.js';
export declare function registerDefaultTransforms(editor: LexicalEditor): () => void;
