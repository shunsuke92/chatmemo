import { useRecoilValue } from 'recoil';

import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';

import { DateChipWrapper } from './DateChipWrapper';
import { TimelineWrapper } from './TimelineWrapper';
import { isRenderingState } from '../states/isRenderingState';
import styles from '../styles/Home.module.css';

const ContentsSkeleton = () => {
  return (
    <Stack spacing={1.5} sx={{ width: '100%', display: 'flex', alignItems: 'flex-end' }}>
      <Skeleton variant='rounded' width={300} height={100} sx={{ borderRadius: 2 }} />
      <Skeleton variant='circular' width={24} height={24} />
    </Stack>
  );
};

export const Skeletons = () => {
  const isRendering = useRecoilValue(isRenderingState);
  return (
    <>
      {isRendering && (
        <div className={styles.main}>
          <TimelineWrapper>
            <DateChipWrapper>
              <Skeleton variant='rounded' width={80} height={26} sx={{ borderRadius: 20 }} />
            </DateChipWrapper>
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
          </TimelineWrapper>
        </div>
      )}
    </>
  );
};
