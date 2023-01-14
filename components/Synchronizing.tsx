import { Box } from '@mui/system';
import { useMaskBackground } from '../hooks/useColor';
import LinearProgress from '@mui/material/LinearProgress';
import { useRecoilValue } from 'recoil';
import { isSynchronizingState } from '../states/isSynchronizingState';
import { synchronizingProgressState } from '../states/synchronizingProgressState';

interface SynchronizingProps {
  progress: boolean;
}

export const Synchronizing = (props: SynchronizingProps) => {
  const { progress } = props;
  const maskBackground = useMaskBackground();

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
            ...maskBackground,
          }}
        >
          {progress && <LinearProgress variant='determinate' value={synchronizingProgress} />}
        </Box>
      )}
    </>
  );
};
