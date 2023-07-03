import { useSetRecoilState } from 'recoil';

import AddCommentIcon from '@mui/icons-material/AddComment';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';

import { InternalData } from './Timeline';
import { addingContentIDState } from '../states/addingContentIDState';

interface AddCommentButtonProps {
  data: InternalData;
}

export const AddCommentButton = (props: AddCommentButtonProps) => {
  const { data } = props;

  const setAddingContentID = useSetRecoilState(addingContentIDState);

  const handleClick = (id: string) => {
    return () => {
      setAddingContentID(id);
    };
  };

  return (
    <Tooltip title='コメントを追加'>
      <IconButton
        aria-label='add comment'
        sx={{ color: 'text.secondary' }}
        onClick={handleClick(data.id)}
        size='small'
      >
        <AddCommentIcon fontSize='small' />
      </IconButton>
    </Tooltip>
  );
};
