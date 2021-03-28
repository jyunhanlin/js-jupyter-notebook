import { Box } from '@chakra-ui/react';
import styled from '@emotion/styled/macro';
import MDEditor from '@uiw/react-md-editor';
import { useState, useEffect, useRef } from 'react';

import { useActions } from '../hooks/use-actions';
import type { Cell } from '../state';

type TextEditorProps = {
  cell: Cell;
};

const EditorWrapper = styled(Box)`
  & .w-md-editor-bar svg {
    display: none;
  }

  & .w-md-editor-bar {
    background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAFAQMAAABo7865AAAABlBMVEVHcEzMzMzyAv2sAAAAAXRSTlMAQObYZgAAABBJREFUeF5jOAMEEAIEEFwAn3kMwcB6I2AAAAAASUVORK5CYII=');
    height: 11px;
    cursor: row-resize;
    background-color: #37414b;
    background-repeat: no-repeat;
    background-position: 50%;
    width: 100%;
    position: relative;
  }

  & em {
    font-style: italic;
  }

  & .wmde-markdown hr {
    border-top: 1px solid #dee5ed;
  }

  & .wmde-markdown ol {
    list-style: decimal;
  }

  & .w-md-editor-show-live {
    /* Hide menu bar buttons to prevent accidental delete */
    z-index: 20;
  }

  & .w-md-editor-toolbar {
    background-color: #37414b;
    border-bottom: 1px solid gray;
  }

  & .w-md-editor-toolbar li button {
    color: #d4d4d4;
  }

  & .w-md-editor-content {
    background-color: #202123;
  }

  & .w-md-editor,
  & .w-md-editor .w-md-editor-text-pre {
    color: #d4d4d4;
  }

  & .w-md-editor-text-pre .bold {
    color: unset;
  }

  & .token.list.punctuation {
    background-color: unset;
  }
`;

const ContentWrapper = styled(Box)`
  border: 1px solid #4e5d6c;
  border-radius: 0;
  box-shadow: none;
  color: #dee5ed;
  max-width: 100%;
  position: relative;
  padding: 1.5rem;
`;

const TextEditor: React.FC<TextEditorProps> = ({ cell }) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const [editing, setEditing] = useState(false);
  const { updateCell } = useActions();

  useEffect(() => {
    const listener = (event: MouseEvent) => {
      if (ref.current && event.target && ref.current.contains(event.target as Node)) {
        return;
      }

      setEditing(false);
    };
    document.addEventListener('click', listener, { capture: true });

    return () => {
      document.removeEventListener('click', listener, { capture: true });
    };
  }, []);

  if (editing) {
    return (
      <EditorWrapper ref={ref}>
        <MDEditor value={cell.content} onChange={(v) => updateCell(cell.id, v || '')} />
      </EditorWrapper>
    );
  }

  return (
    <EditorWrapper onClick={() => setEditing(true)}>
      <ContentWrapper>
        <MDEditor.Markdown source={cell.content || 'Click to edit'} />
      </ContentWrapper>
    </EditorWrapper>
  );
};

export default TextEditor;
