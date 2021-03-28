import { Global, css } from '@emotion/react';

const TextEditorSyntax = () => {
  return (
    <Global
      styles={css`
        .w-md-editor .title {
          color: #d4d4d4 !important;
        }
      `}
    />
  );
};

export default TextEditorSyntax;
