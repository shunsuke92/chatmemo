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

import { useServerDeleteAccount } from '../hooks/useServerDeleteAccount';
import { authUserState } from '../states/authUserState';
import { displayAlertDialogState } from '../states/displayAlertDialogState';
import { signout } from '../utils/signout';

export const DeleteAccountAlertDialog = () => {
  const user = useRecoilValue(authUserState);

  const displayAlertDialog = useRecoilValue(displayAlertDialogState);
  const setDisplayAlertDialog = useSetRecoilState(displayAlertDialogState);

  const deleteAccount = useServerDeleteAccount();

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
          アカウントの削除を実行すると、これまでに保存したメモを含め、すべての情報が削除されます。この操作は取消できません。
        </DialogContentText>
        <DialogContentText id='alert-dialog-description' mt={3}>
          以下の入力フィールドに&quot;{user?.displayName}&quot;
          を入力し、「削除」ボタンを押下してください。
        </DialogContentText>
        <TextField
          autoFocus
          value={value}
          margin='dense'
          fullWidth
          variant='outlined'
          onChange={handleChange}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} variant='outlined' autoFocus>
          キャンセル
        </Button>
        <Button onClick={handleClick} disabled={user?.displayName !== value} variant='contained'>
          削除
        </Button>
      </DialogActions>
    </Dialog>
  );
};
