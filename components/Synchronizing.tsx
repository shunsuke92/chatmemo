import { Box } from '@mui/system';
import { useOperationContext } from './OperationContext';
import { useMaskBackground } from '../hooks/useColor';
import LinearProgress from '@mui/material/LinearProgress';

interface SynchronizingProps {
  progress: boolean;
}

export default function Synchronizing(props: SynchronizingProps) {
  const { progress } = props;
  const info = useOperationContext();
  const maskBackground = useMaskBackground();

  const isDisplay: boolean = info?.isSynchronizing ?? false;

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
          {progress && <LinearProgress variant='determinate' value={info?.synchronizingProgress} />}
        </Box>
      )}
    </>
  );
}
