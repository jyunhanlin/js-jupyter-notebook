import { parse } from '@babel/parser';
import traverse from '@babel/traverse';
import { Box, Button } from '@chakra-ui/react';
import styled from '@emotion/styled/macro';
import MonacoEditor, { OnMount } from '@monaco-editor/react';
import Highlighter from 'monaco-jsx-highlighter';
import prettier from 'prettier';
import parser from 'prettier/parser-babel';
import { useRef } from 'react';

const FormatButton = styled(Button)`
  position: absolute;
  top: 5px;
  right: 5px;
  z-index: 20;
  opacity: 0;
  transition: opacity 0.3s;
`;

const EditorWrapper = styled(Box)`
  position: relative;
  height: 100%;
  width: calc(100% - 10px);

  :hover ${FormatButton} {
    opacity: 1;
  }
`;

type CodeEditorProps = {
  initialValue: string;
  onChange(value: string): void;
};

const babelParse = (code: string) =>
  parse(code, {
    sourceType: 'module',
    plugins: ['jsx'],
  });

const CodeEditor: React.FC<CodeEditorProps> = ({ onChange, initialValue }) => {
  const editorRef = useRef<any>();

  const onEditorDidMount: OnMount = (editor) => {
    editorRef.current = editor;

    editor.onDidChangeModelContent(() => {
      onChange(editor.getValue());
    });

    editor.getModel()?.updateOptions({ tabSize: 2 });

    const highlighter = new Highlighter(
      // @ts-ignore
      window.monaco,
      babelParse,
      traverse,
      editor,
    );

    highlighter.highLightOnDidChangeModelContent(100);
    // Activate JSX commenting
    highlighter.addJSXCommentCommand();
  };

  const onFormatClick = () => {
    // get current value from editor
    const unformatted = editorRef.current.getModel().getValue();

    // format that value
    const formatted = prettier
      .format(unformatted, {
        parser: 'babel',
        plugins: [parser],
        useTabs: false,
        semi: true,
        singleQuote: true,
      })
      .replace(/\n$/, '');

    // set the formatted value back in the editor
    editorRef.current.setValue(formatted);
  };

  return (
    <EditorWrapper>
      <FormatButton size="sm" onClick={onFormatClick}>
        Format
      </FormatButton>
      <MonacoEditor
        onMount={onEditorDidMount}
        value={initialValue}
        theme="vs-dark"
        language="javascript"
        height="100%"
        options={{
          wordWrap: 'on',
          minimap: { enabled: false },
          showUnused: false,
          folding: false,
          lineNumbersMinChars: 3,
          fontSize: 14,
          scrollBeyondLastLine: false,
          automaticLayout: true,
        }}
      />
    </EditorWrapper>
  );
};

export default CodeEditor;
