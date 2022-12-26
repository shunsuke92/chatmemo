import Stack from '@mui/material/Stack';
import { ChatPack } from './ChatPack';
import { ChatMemoProps } from '../components/ChatMemo';

export const ChatComment = (props: ChatMemoProps) => {
  return (
    <Stack spacing={1} sx={{ pt: 1, display: 'flex', alignItems: 'flex-end', maxWidth: '100%' }}>
      <ChatPack {...props} isOutermost={false} />
    </Stack>
  );
};
