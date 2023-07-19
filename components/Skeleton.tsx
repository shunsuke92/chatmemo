import { useRecoilValue } from 'recoil';

import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import Fade from '@mui/material/Fade';
import MuiSkeleton from '@mui/material/Skeleton';

import { initialLoadingState } from '../states/initialLoadingState';
import { isLoggingoutState } from '../states/isLoggingoutState';

export const Skeleton = () => {
  const initialLoading = useRecoilValue(initialLoadingState);
  const isLoggingout = useRecoilValue(isLoggingoutState);

  const MenuBarSkeleton = () => {
    return (
      <MuiSkeleton
        className='fouc-bar-color'
        variant='rectangular'
        width={'100%'}
        sx={{ height: { xs: '56px', sm: '64px' } }}
      />
    );
  };

  const BottomBarSkeleton = () => {
    return (
      <MuiSkeleton
        className='fouc-bar-color'
        variant='rectangular'
        width={'100%'}
        sx={{ height: { xs: '72px', sm: '80px' } }}
      />
    );
  };

  return (
    <>
      {initialLoading < 2 && !isLoggingout && (
        <Box
          sx={{
            position: 'fixed',
            top: '0',
            left: '0',
            width: '100%',
            height: '100vh',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <MenuBarSkeleton />
          <Fade
            in={true}
            style={{
              transitionDelay: '200ms',
            }}
          >
            <CircularProgress size={25} sx={{ color: 'grey.500' }} disableShrink />
          </Fade>
          <BottomBarSkeleton />
        </Box>
      )}
    </>
  );
};
