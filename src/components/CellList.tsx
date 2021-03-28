import { Box } from '@chakra-ui/react';
import styled from '@emotion/styled/macro';
import { Fragment } from 'react';

import { useTypedSelector } from '../hooks/use-typed-selector';
import AddCell from './AddCell';
import CellListItem from './CellListItem';
import CodeEditorSyntax from './CodeEditorSyntax';
import ResizableSyntax from './ResizableSyntax';
import TextEditorSyntax from './TextEditorSyntax';

const ListWrapper = styled(Box)`
  margin: 0 25px 50vh;

  .react-draggable-transparent-selection & {
    margin-bottom: 100vh;
  }
`;

const CellList: React.FC = () => {
  const cells = useTypedSelector(({ cells: { order, data } }) => order.map((id) => data[id]));

  return (
    <ListWrapper>
      <ResizableSyntax />
      <CodeEditorSyntax />
      <TextEditorSyntax />
      <AddCell forceVisible={cells.length === 0} previousCellId={null} />
      {cells.map((cell) => (
        <Fragment key={cell.id}>
          <CellListItem cell={cell} />
          <AddCell previousCellId={cell.id} />
        </Fragment>
      ))}
    </ListWrapper>
  );
};

export default CellList;
