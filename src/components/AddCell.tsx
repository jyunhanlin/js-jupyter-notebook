import { Box, Flex, Button, Divider } from '@chakra-ui/react';
import { FaPlus } from 'react-icons/fa';

import { useActions } from '../hooks/use-actions';

type AddCellProps = {
  previousCellId: string | null;
  forceVisible?: boolean;
};

const AddCell: React.FC<AddCellProps> = ({ forceVisible, previousCellId }) => {
  const { insertCellAfter } = useActions();

  return (
    <Box
      position="relative"
      opacity={forceVisible ? 1 : 0}
      transition="opacity 0.3s ease-in 0.1s"
      my="8px"
      _hover={{
        opacity: 1,
      }}
    >
      <Flex justifyContent="center">
        <Button
          mx="20px"
          leftIcon={<FaPlus />}
          colorScheme="orange"
          size="sm"
          onClick={() => insertCellAfter(previousCellId, 'code')}
        >
          Code
        </Button>
        <Button
          mx="20px"
          leftIcon={<FaPlus />}
          colorScheme="orange"
          size="sm"
          onClick={() => insertCellAfter(previousCellId, 'text')}
        >
          Text
        </Button>
      </Flex>
      <Divider position="absolute" top="50%" bottom="50%" right="2.5%" left="2.5%" width="95%" />
    </Box>
  );
};

export default AddCell;
