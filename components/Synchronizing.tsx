import { useRecoilValue } from 'recoil';

import LinearProgress from '@mui/material/LinearProgress';
import { Box } from '@mui/system';

import { useDarkMode } from '../hooks/useDarkMode';
import { isSynchronizingState } from '../states/isSynchronizingState';
import { synchronizingProgressState } from '../states/synchronizingProgressState';

interface SynchronizingProps {
  progress: boolean;
}

export const Synchronizing = (props: SynchronizingProps) => {
  const { progress } = props;
  const darkMode = useDarkMode();

  const isSynchronizing = useRecoilValue(isSynchronizingState);
  const synchronizingProgress = useRecoilValue(synchronizingProgressState);

  const isDisplay: boolean = isSynchronizing;

  return (
    <>
      {isDisplay && (
        <Box
          sx={{
            width: '100%',
            height: '100%',
            position: 'fixed',
            top: 0,
            zIndex: 2000,
            backgroundColor: darkMode ? 'grey.800' : 'grey.300',
            opacity: 0.3,
          }}
        >
          {progress && (
            <LinearProgress
              variant='determinate'
              value={synchronizingProgress}
              aria-label='Progress Bar'
            />
          )}
        </Box>
      )}
    </>
  );
};
