import { memo } from 'react';

import Chip from '@mui/material/Chip';

import { DateChipWrapper } from '../components/DateChipWrapper';
import { useDateColor, useDateBackground } from '../hooks/useColor';

export const DateChip = memo(function Datechip(props: { date: string }) {
  const { date } = props;

  const dateColor = useDateColor();
  const dateBackground = useDateBackground();

  return (
    <DateChipWrapper>
      <Chip
        label={date}
        size='small'
        sx={{
          maxWidth: '100%',
          display: 'flex',
          alignItems: 'center',
          color: dateColor,
          bgcolor: dateBackground,
        }}
      />
    </DateChipWrapper>
  );
});
