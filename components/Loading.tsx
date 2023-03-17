import { useRecoilValue } from 'recoil';

import CircularProgress from '@mui/material/CircularProgress';
import Stack from '@mui/material/Stack';

import { isAllDisplayedState } from '../states/isAllDisplayedState';

export const Loading = () => {
  const isAllDisplayed = useRecoilValue(isAllDisplayedState);

  return (
    <>
      {!isAllDisplayed && (
        <Stack sx={{ width: '100%', display: 'flex', alignItems: 'center', mt: 0 }}>
          <CircularProgress
            variant='indeterminate'
            disableShrink
            sx={{
              animationDuration: '650ms',
            }}
            size={25}
            thickness={5}
            aria-label='Progress Bar'
          />
        </Stack>
      )}
    </>
  );
};
