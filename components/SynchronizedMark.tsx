import Tooltip from '@mui/material/Tooltip';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import { InternalData } from './Timeline';

interface SynchronizedMarkProps {
  data: InternalData;
}

export const SynchronizedMark = (props: SynchronizedMarkProps) => {
  const { data } = props;

  const isSynchronized = !data.synchronized;

  return (
    <>
      {isSynchronized && (
        <Tooltip title='通信エラー'>
          <ErrorOutlineIcon color='error' sx={{ fontSize: 18 }} />
        </Tooltip>
      )}
    </>
  );
};
