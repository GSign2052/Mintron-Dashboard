import { LexicalEditor } from 'lexical';
import { AtLinkNode } from '@tryghost/kg-default-nodes';
export declare function removeAtLinkNodesTransform(node: AtLinkNode): void;
export declare function registerRemoveAtLinkNodesTransform(editor: LexicalEditor): () => void;
