import styled from '@emotion/styled/macro';
import { useRef, useEffect } from 'react';

const PreviewWrapper = styled.div`
  position: relative;
  height: 100%;
  flex-grow: 1;

  iframe {
    height: 100%;
    width: 100%;
  }

  .react-draggable-transparent-selection &:after {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    opacity: 0;
  }
`;

const PreviewError = styled.div`
  position: absolute;
  top: 10px;
  left: 10px;
  color: red;
`;

type PreviewProps = {
  code: string;
  err: string;
};

const html = /* html */ `
    <html>
      <head>
        <style>html { background-color: white; }</style>
      </head>
      <body>
        <div id="root"></div>
        <script>
          const handleError = (err) => {
            const root = document.querySelector('#root');
            root.innerHTML = '<div style="color: red;"><h4>Runtime Error</h4>' + err + '</div>';
            console.error(err);
          };

          window.addEventListener('error', (event) => {
            event.preventDefault();
            handleError(event.error);
          });

          window.addEventListener('message', (event) => {
            try {
              eval(event.data);
            } catch (err) {
              handleError(err);
            }
          }, false);
        </script>
      </body>
    </html>
  `;

const Preview: React.FC<PreviewProps> = ({ code, err }) => {
  const iframe = useRef<any>();

  useEffect(() => {
    if (iframe.current) {
      iframe.current.srcdoc = html;
      setTimeout(() => {
        iframe.current.contentWindow.postMessage(code, '*');
      }, 50);
    }
  }, [code]);

  return (
    <PreviewWrapper>
      <iframe title="preview" ref={iframe} sandbox="allow-scripts" srcDoc={html} />
      {err && <PreviewError>{err}</PreviewError>}
    </PreviewWrapper>
  );
};

export default Preview;
