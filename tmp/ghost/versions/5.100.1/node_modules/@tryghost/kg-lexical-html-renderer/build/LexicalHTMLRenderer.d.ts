/// <reference types="jsdom" />
/// <reference types="jsdom" />
import { SerializedEditorState, LexicalNode, Klass } from 'lexical';
interface RenderOptions {
    target?: 'html' | 'email' | 'plaintext';
    dom?: import('jsdom').JSDOM;
    renderData?: Map<number, any>;
}
export default class LexicalHTMLRenderer {
    dom: import('jsdom').JSDOM;
    nodes: Klass<LexicalNode>[];
    onError: (error: Error) => void;
    constructor({ dom, nodes, onError }?: {
        dom?: import('jsdom').JSDOM;
        nodes?: Klass<LexicalNode>[];
        onError?: () => void;
    });
    render(lexicalState: SerializedEditorState | string, userOptions?: RenderOptions): Promise<string>;
}
export {};
