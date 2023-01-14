import Stack from '@mui/material/Stack';

import { ChatMemoProps } from '../components/ChatMemo';
import { ChatPack } from './ChatPack';

export const ChatComment = (props: ChatMemoProps) => {
  return (
    <Stack spacing={1} sx={{ pt: 1, display: 'flex', alignItems: 'flex-end', maxWidth: '100%' }}>
      <ChatPack {...props} isOutermost={false} />
    </Stack>
  );
};
