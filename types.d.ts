declare module 'monaco-jsx-highlighter' {
  import * as monaco from 'monaco-editor';
  import traverse from '@babel/traverse';

  export default class MonacoJSXHighlighter {
    constructor(
      monacoInstance: typeof monaco,
      babelParse: (code: string) => any,
      traverse: typeof traverse,
      editor: monaco.editor.IStandaloneCodeEditor,
      options?: {
        isHighlightGlyph?: boolean;
        iShowHover?: boolean;
      }
    );
    highlightOnDidChangeModelContent(debounce?: number): void;
    addJSXCommentCommand(): void;
    dispose(): void;
  }
}