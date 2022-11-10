import Stack from '@mui/material/Stack';
import { Comment } from './DataContext';
import { ChatPack } from './ChatPack';
import { InternalData } from './Timeline';

interface ChatCommentProps {
  data: Comment;
  memoID: string;
}

export const ChatComment = (props: ChatCommentProps) => {
  const { data, memoID } = props;

  const displayComment: InternalData = {
    type: 'comment',
    id: data._id,
    memoID: memoID,
    text: data._text,
    createdAt: data.createdAt,
    updatedAt: data.updatedAt,
    date: data._date,
    time: data._time,
    synchronized: data._synchronized,
  };

  return (
    <Stack spacing={1} sx={{ pt: 1, display: 'flex', alignItems: 'flex-end', maxWidth: '100%' }}>
      <ChatPack data={displayComment} />
    </Stack>
  );
};
