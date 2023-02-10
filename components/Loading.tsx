import { useRecoilValue } from 'recoil';

import CircularProgress from '@mui/material/CircularProgress';
import Stack from '@mui/material/Stack';

import { isLoadingState } from '../states/isLoadingState';

export const Loading = () => {
  const isLoading = useRecoilValue(isLoadingState);

  return (
    <>
      {isLoading && (
        <Stack sx={{ width: '100%', display: 'flex', alignItems: 'center', mt: 1 }}>
          <CircularProgress
            variant='indeterminate'
            disableShrink
            sx={{
              animationDuration: '650ms',
            }}
            size={25}
            thickness={5}
          />
        </Stack>
      )}
    </>
  );
};
