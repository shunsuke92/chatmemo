import { useEffect, useState, forwardRef } from 'react';

import { useRecoilValue } from 'recoil';

import CloseIcon from '@mui/icons-material/Close';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import IconButton from '@mui/material/IconButton';
import Snackbar from '@mui/material/Snackbar';

import { isOnlineState } from '../states/isOnlineState';
import { synchronizingProgressState } from '../states/synchronizingProgressState';

export const OfflineNotification = () => {
  const [openOnline, setOpenOnline] = useState(false);
  const [openOffline, setOpenOffline] = useState(false);
  const [isAlreadyOffline, setIsAlreadyOffline] = useState(false);
  const isOnline = useRecoilValue(isOnlineState);
  const synchronizingProgress = useRecoilValue(synchronizingProgressState);

  useEffect(() => {
    setOpenOnline(!isOnline);
    setOpenOffline(isOnline);
    if (!isOnline) {
      setIsAlreadyOffline(true);
    }
  }, [isOnline]);

  const handleClose = (event: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpenOnline(false);
    setOpenOffline(false);
  };

  const action = (
    <IconButton size='small' aria-label='close' color='inherit' onClick={handleClose}>
      <CloseIcon fontSize='small' />
    </IconButton>
  );

  const progress = (value: number) => {
    return Math.floor(value / 10) * 10;
  };

  const Alert = forwardRef<HTMLDivElement, AlertProps>(function Alert(props, ref) {
    return (
      <MuiAlert
        elevation={6}
        ref={ref}
        variant='filled'
        action={action}
        sx={{ boxShadow: 'none' }}
        {...props}
      />
    );
  });

  return (
    <>
      <Snackbar
        open={openOnline}
        sx={{
          maxWidth: { xs: 'calc(100% - 16px)', sm: 'calc(100% - 48px)' },
          zIndex: 3000,
        }}
      >
        <Alert severity='error'>
          <AlertTitle>インターネットに接続されていません。</AlertTitle>
          <div>
            オフライン中の操作はブラウザ内に保存され、インターネット接続後にサーバーと同期されます。
          </div>
          <div>
            ただし、インターネット接続前にブラウザを閉じたり、ページを再読み込みした場合、それまでの操作は保存されません。
          </div>
        </Alert>
      </Snackbar>
      <Snackbar
        open={openOffline && isAlreadyOffline}
        autoHideDuration={8000}
        onClose={handleClose}
        sx={{ maxWidth: '97%', zIndex: 3000 }}
      >
        <Alert severity='info'>
          <AlertTitle>インターネットに接続されました。</AlertTitle>
          {synchronizingProgress === 0
            ? 'サーバー同期：完了'
            : `サーバー同期：${progress(synchronizingProgress)}%`}
        </Alert>
      </Snackbar>
    </>
  );
};
