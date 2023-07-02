import { useRecoilValue } from 'recoil';

import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import Stack from '@mui/material/Stack';
import { Box } from '@mui/system';

import { isAllDisplayedState } from '../states/isAllDisplayedState';

export const Loading = () => {
  const isAllDisplayed = useRecoilValue(isAllDisplayedState);

  return (
    <Stack sx={{ width: '100%', display: 'flex', alignItems: 'center', mt: 0 }}>
      {!isAllDisplayed && (
        <Box
          sx={{
            backgroundColor: 'grey.900',
            borderRadius: 9999,
            width: '40px',
            height: '40px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <ArrowUpwardIcon
            sx={{
              color: 'grey.600',
            }}
          />
        </Box>
      )}
    </Stack>
  );
};
