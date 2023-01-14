import AddCommentIcon from '@mui/icons-material/AddComment';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';

import { InternalData } from './Timeline';

interface AddCommentButtonProps {
  data: InternalData;
  changeAddingContentID: (id: string) => void;
}

export const AddCommentButton = (props: AddCommentButtonProps) => {
  const { data, changeAddingContentID } = props;

  function handleClick(id: string) {
    return function () {
      changeAddingContentID(id);
    };
  }

  return (
    <Tooltip title='コメントを追加'>
      <IconButton
        aria-label='add-comment'
        sx={{ color: 'text.secondary' }}
        onClick={handleClick(data.id)}
        size='small'
      >
        <AddCommentIcon fontSize='small' />
      </IconButton>
    </Tooltip>
  );
};
