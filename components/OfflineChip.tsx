import { useRecoilValue } from 'recoil';

import CircleIcon from '@mui/icons-material/Circle';
import Chip from '@mui/material/Chip';

import { isOnlineState } from '../states/isOnlineState';

export const OfflineChip = () => {
  const isOnline = useRecoilValue(isOnlineState);

  return (
    <>
      {!isOnline && (
        <Chip
          label='オフライン'
          color='error'
          variant='outlined'
          icon={<CircleIcon sx={{ width: '15px' }} />}
          sx={{ fontWeight: 500, mr: { xs: 2, sm: 4 }, borderWidth: '2px' }}
        />
      )}
    </>
  );
};
