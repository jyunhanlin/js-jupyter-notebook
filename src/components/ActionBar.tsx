import { Box, IconButton } from '@chakra-ui/react';
import { FaArrowUp, FaArrowDown, FaTimes } from 'react-icons/fa';

import { useActions } from '../hooks/use-actions';

type ActionBarProps = {
  id: string;
};

const ActionBar: React.FC<ActionBarProps> = ({ id }) => {
  const { moveCell, deleteCell } = useActions();

  return (
    <Box
      position="absolute"
      top="0"
      right="0"
      opacity="0.25"
      transition="opacity 0.3s"
      _hover={{
        opacity: 1,
      }}
    >
      <IconButton
        aria-label="arrow-up"
        icon={<FaArrowUp />}
        size="sm"
        borderRadius="0"
        colorScheme="orange"
        onClick={() => moveCell(id, 'up')}
      />
      <IconButton
        aria-label="arrow-down"
        icon={<FaArrowDown />}
        size="sm"
        borderRadius="0"
        colorScheme="orange"
        onClick={() => moveCell(id, 'down')}
      />
      <IconButton
        aria-label="delete"
        icon={<FaTimes />}
        size="sm"
        borderRadius="0"
        colorScheme="orange"
        onClick={() => deleteCell(id)}
      />
    </Box>
  );
};

export default ActionBar;
