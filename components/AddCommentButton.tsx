import IconButton from '@mui/material/IconButton';
import { useOperationContext } from './OperationContext';
import Tooltip from '@mui/material/Tooltip';
import AddCommentIcon from '@mui/icons-material/AddComment';
import { InternalData } from './Timeline';

interface AddCommentButtonProps {
  data: InternalData;
}

export const AddCommentButton = (props: AddCommentButtonProps) => {
  const { data } = props;

  const info = useOperationContext();

  function handleClick(id: string) {
    return function () {
      if (info?.addingContentID === id) {
        info?.clearAddingContentID();
      } else {
        info?.changeAddingContentID(id);
      }
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
