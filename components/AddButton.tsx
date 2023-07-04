import SendIcon from '@mui/icons-material/Send';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';

interface AddButtonProps {
  hasValidString: boolean;
  createMemo: () => void;
}

export const AddButton = (props: AddButtonProps) => {
  const { hasValidString, createMemo } = props;

  return (
    <Stack sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      {hasValidString ? (
        <IconButton aria-label='add memo' color='primary' onClick={createMemo}>
          <SendIcon />
        </IconButton>
      ) : (
        <IconButton aria-label='add memo' disabled>
          <SendIcon />
        </IconButton>
      )}
    </Stack>
  );
};
