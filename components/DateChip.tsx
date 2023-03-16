import { memo } from 'react';

import Chip from '@mui/material/Chip';

import { DateChipWrapper } from '../components/DateChipWrapper';
import { useDateColor } from '../hooks/useColor';

export const DateChip = memo(function Datechip(props: { date: string }) {
  const { date } = props;

  const dateColor = useDateColor();

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
        }}
      />
    </DateChipWrapper>
  );
});
