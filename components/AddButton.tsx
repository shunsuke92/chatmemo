import { useEffect } from 'react';

import SendIcon from '@mui/icons-material/Send';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';

import { useGetIsAdding } from '../components/Main';

interface AddButtonProps {
  hasValidString: boolean;
  createMemo: () => void;
}

export const AddButton = (props: AddButtonProps) => {
  const isAdding = useGetIsAdding();

  const { hasValidString, createMemo } = props;

  return (
    <Stack sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      {hasValidString ? (
        <IconButton
          aria-label='add memo'
          color='primary'
          onClick={createMemo}
          sx={{
            zIndex: isAdding ? 2500 : null,
          }}
        >
          <SendIcon />
        </IconButton>
      ) : (
        <IconButton
          aria-label='add memo'
          disabled
          sx={{
            zIndex: isAdding ? 2500 : null,
          }}
        >
          <SendIcon />
        </IconButton>
      )}
    </Stack>
  );
};
