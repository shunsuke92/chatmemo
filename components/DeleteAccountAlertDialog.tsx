import { useState } from 'react';

import { useRecoilValue } from 'recoil';
import { useSetRecoilState } from 'recoil';

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';

import { useClearRecoilState } from '../hooks/useClearRecoilState';
import { useServerDeleteAccount } from '../hooks/useServerDeleteAccount';
import { authUserState } from '../states/authUserState';
import { displayAlertDialogState } from '../states/displayAlertDialogState';
import { isLoggingoutState } from '../states/isLoggingoutState';
import { signout } from '../utils/signout';

export const DeleteAccountAlertDialog = () => {
  const user = useRecoilValue(authUserState);

  const displayAlertDialog = useRecoilValue(displayAlertDialogState);
  const setDisplayAlertDialog = useSetRecoilState(displayAlertDialogState);
  const setIsLoggingout = useSetRecoilState(isLoggingoutState);

  const deleteAccount = useServerDeleteAccount();
  const clearRecoilState = useClearRecoilState();

  const [value, setValue] = useState('');

  const isDisplay: boolean = displayAlertDialog === 'delete-account';

  const handleClick = async () => {
    // 入力値初期化
    setValue('');

    // ダイアログを閉じる
    setDisplayAlertDialog(undefined);

    // サーバーからアカウントを削除する
    const result = await deleteAccount();

    if (result) {
      // サインアウトする
      signout();
      setIsLoggingout(true);
      clearRecoilState();
    } else {
      alert('アカウント削除が失敗しました。');
    }
  };

  const handleClose = () => {
    // 入力値初期化
    setValue('');

    // ダイアログを閉じる
    setDisplayAlertDialog(undefined);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  return (
    <Dialog
      open={isDisplay}
      onClose={handleClose}
      aria-labelledby='alert-dialog-title'
      aria-describedby='alert-dialog-description'
    >
      <DialogTitle id='alert-dialog-title'>アカウントの削除</DialogTitle>
      <DialogContent>
        <DialogContentText id='alert-dialog-description'>
          アカウントを削除すると、これまでに保存したメモ等、すべての情報が削除されます。削除したアカウントを復旧することはできません。
        </DialogContentText>
        <DialogContentText id='alert-dialog-description' mt={3}>
          以下の入力フィールドに&quot;{user?.displayName}&quot;
          を入力し、「削除」ボタンを押してください。
        </DialogContentText>
        <TextField
          autoFocus
          value={value}
          margin='dense'
          fullWidth
          variant='outlined'
          color='error'
          onChange={handleChange}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} variant='outlined' color='error' autoFocus>
          キャンセル
        </Button>
        <Button
          onClick={handleClick}
          disabled={user?.displayName !== value}
          variant='contained'
          color='error'
          sx={{ boxShadow: 'none' }}
        >
          削除
        </Button>
      </DialogActions>
    </Dialog>
  );
};
