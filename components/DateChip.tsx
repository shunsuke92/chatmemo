import { memo } from 'react';
import Stack from '@mui/material/Stack';
import Chip from '@mui/material/Chip';

export const DateChip = memo(function Datechip(props: { date: string }) {
  const { date } = props;

  return (
    <>
      {
        <Stack
          spacing={2}
          pt={1}
          sx={{ width: '100%', maxWidth: '100%', display: 'flex', alignItems: 'center' }}
        >
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
        </Stack>
      }
    </>
  );
});
