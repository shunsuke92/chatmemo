import { useRecoilValue } from 'recoil';

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
          sx={{ fontWeight: 500, mr: 4, borderWidth: '2px' }}
        />
      )}
    </>
  );
};
