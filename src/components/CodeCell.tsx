import { Flex, Box, Progress } from '@chakra-ui/react';
import { useEffect } from 'react';

import { useActions } from '../hooks/use-actions';
import { useCumulativeCode } from '../hooks/use-cumulative-code';
import { useTypedSelector } from '../hooks/use-typed-selector';
import type { Cell } from '../state';
import CodeEditor from './CodeEditor';
import Preview from './Preview';
import Resizable from './Resizable';

type CodeCellProps = {
  cell: Cell;
};

const CodeCell: React.FC<CodeCellProps> = ({ cell }) => {
  const { updateCell, createBundle } = useActions();
  const bundle = useTypedSelector((state) => state.bundles[cell.id]);
  const cumulativeCode = useCumulativeCode(cell.id);

  useEffect(() => {
    if (!bundle) {
      createBundle(cell.id, cumulativeCode);
      return;
    }

    const timer = setTimeout(async () => {
      createBundle(cell.id, cumulativeCode);
    }, 750);

    return () => {
      clearTimeout(timer);
    };
  }, [cumulativeCode, cell.id, createBundle]);

  return (
    <Resizable direction="vertical">
      <Flex height="calc(100% - 10px)" flexDirection="row">
        <Resizable direction="horizontal">
          <CodeEditor initialValue={cell.content} onChange={(value) => updateCell(cell.id, value)} />
        </Resizable>
        <Box height="100%" flexGrow={1} backgroundColor="white">
          {!bundle || bundle.loading ? (
            <Flex width="100%" height="100%" alignItems="center" px="10%">
              <Progress size="md" isIndeterminate width="100%" borderRadius="5px" max={100} />
            </Flex>
          ) : (
            <Preview code={bundle.code} err={bundle.err} />
          )}
        </Box>
      </Flex>
    </Resizable>
  );
};

export default CodeCell;
