import { CreateEditorArgs, type SerializedEditorState } from 'lexical';
export interface htmlToLexicalOptions {
    editorConfig: CreateEditorArgs;
}
export declare function htmlToLexical(html: string, options?: htmlToLexicalOptions): SerializedEditorState;
