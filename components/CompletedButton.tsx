import IconButton from '@mui/material/IconButton';
import { useDataContext } from './DataContext';
import RadioButtonCheckedIcon from '@mui/icons-material/RadioButtonChecked';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import { InternalData, useGetIsTrash } from './Timeline';

interface CompletedButtonProps {
  data: InternalData;
}

export const CompletedButton = (props: CompletedButtonProps) => {
  const { data } = props;

  const isCompleted = data.completed;
  const isTrash = useGetIsTrash();
  const originalData = useDataContext();

  const handleClick = () => {
    originalData?.updateServerCompleted(data.id);
    originalData?.updateLocalCompleted(data.id);
  };

  return (
    <IconButton
      aria-label='completed'
      sx={{ color: 'text.secondary' }}
      onClick={handleClick}
      size='small'
      disabled={isTrash}
    >
      {isCompleted ? (
        <RadioButtonCheckedIcon fontSize='small' color={isTrash ? 'disabled' : 'primary'} />
      ) : (
        <RadioButtonUncheckedIcon fontSize='small' color='disabled' />
      )}
    </IconButton>
  );
};
