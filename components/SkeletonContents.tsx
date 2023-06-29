import { useRecoilValue } from 'recoil';

import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';

import { ContentsWrapper } from './ContentsWrapper';
import { TimelineWrapper } from './TimelineWrapper';
import { initialLoadingState } from '../states/initialLoadingState';

export const SkeletonContents = () => {
  const initialLoading = useRecoilValue(initialLoadingState);

  const ContentsSkeleton = () => {
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
            alignItems: 'flex-end',
            justifyContent: 'center',
          }}
        >
          <ContentsWrapper>
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
          </ContentsWrapper>
        </Box>
      )}
    </>
  );
};
