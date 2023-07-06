import { useRecoilValue } from 'recoil';

import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import Fade from '@mui/material/Fade';
import MuiSkeleton from '@mui/material/Skeleton';

import { initialLoadingState } from '../states/initialLoadingState';

export const Skeleton = () => {
  const initialLoading = useRecoilValue(initialLoadingState);

  // 使用中止：コンテンツサイズが可変のため、あまりいいスケルトンではない。
  /* const ContentsSkeleton = () => {
    return (
      <Stack spacing={1.5} direction='column' alignItems='flex-end' sx={{ width: '100%' }}>
        <Skeleton
          className='fouc-bar-color'
          variant='rounded'
          width={300}
          height={100}
          sx={{ borderRadius: 2 }}
        />
        <Stack
          spacing={2}
          direction='row'
          justifyContent='flex-end'
          alignItems='center'
          sx={{
            width: '100%',
          }}
        >
          <Skeleton className='fouc-bar-color' variant='circular' width={24} height={24} />
          <Skeleton className='fouc-bar-color' variant='circular' width={24} height={24} />
        </Stack>
      </Stack>
    );
  }; */

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
      {initialLoading < 2 && (
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
          {/* <ContentsWrapper>
            <TimelineWrapper>
              <Stack spacing={4} direction='column' alignItems='flex-end' sx={{ width: '100%' }}>
                <ContentsSkeleton />
                <ContentsSkeleton />
                <ContentsSkeleton />
                <ContentsSkeleton />
                <ContentsSkeleton />
                <ContentsSkeleton />
                <ContentsSkeleton />
                <ContentsSkeleton />
                <ContentsSkeleton />
                <ContentsSkeleton />
              </Stack>
            </TimelineWrapper>
          </ContentsWrapper> */}
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
