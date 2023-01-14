import { memo } from 'react';

import Chip from '@mui/material/Chip';

import { DateChipWrapper } from '../components/DateChipWrapper';

export const DateChip = memo(function Datechip(props: { date: string }) {
  const { date } = props;

  return (
    <DateChipWrapper>
      <Chip
        label={date}
        size='small'
        sx={{
          maxWidth: '100%',
          display: 'flex',
          alignItems: 'center',
          color: 'text.disabled',
        }}
      />
    </DateChipWrapper>
  );
});
