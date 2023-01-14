import RadioButtonCheckedIcon from '@mui/icons-material/RadioButtonChecked';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import IconButton from '@mui/material/IconButton';

import { DelayCompleted } from '../components/DelayCompletedContext';
import { getNowDate } from '../utils/getNowDate';
import { InternalData } from './Timeline';

interface CompletedButtonProps {
  data: InternalData;
  isTrash: boolean;
  delayCompleted: DelayCompleted | undefined;
  updateServerCompleted: (id: string, value: boolean, date?: string | undefined) => Promise<void>;
}

export const CompletedButton = (props: CompletedButtonProps) => {
  const { data, isTrash, delayCompleted, updateServerCompleted } = props;

  const isCompleted = data.completed;

  const handleClick = () => {
    if (!data.completed) {
      const date = getNowDate();
      updateServerCompleted(data.id, !data.completed, date);
      delayCompleted?.updateLocalCompleted(data.id, !data.completed, date);
    } else {
      updateServerCompleted(data.id, !data.completed);
      delayCompleted?.updateLocalCompleted(data.id, !data.completed);
    }
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
