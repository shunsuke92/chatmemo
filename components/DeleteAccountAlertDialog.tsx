import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useDataContext } from './DataContext';
import { useOperationContext } from './OperationContext';
import { useAuthContext } from '../components/AuthContext';
import TextField from '@mui/material/TextField';
import { useState } from 'react';

export default function DeleteMemoAlertDialog() {
  const data = useDataContext();
  const info = useOperationContext();
  const userInfo = useAuthContext();
  const user = userInfo?.user;

  const [value, setValue] = useState('');

  const isDisplay: boolean = info?.displayAlertDialog === 'delete-account' ?? false;

  const handleClick = async () => {
    // 入力値初期化
    setValue('');

    // ダイアログを閉じる
    info?.changeDisplayAlertDialog('');

    // サインアウトする
    userInfo?.signout();

    // サーバーからアカウントを削除する
    data?.deleteAccount();
  };

  const handleClose = () => {
    // 入力値初期化
    setValue('');

    // ダイアログを閉じる
    info?.changeDisplayAlertDialog('');
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
        <Button onClick={handleClose} variant='outlined'>
          キャンセル
        </Button>
        <Button
          onClick={handleClick}
          autoFocus
          disabled={user?.displayName !== value}
          variant='contained'
        >
          削除
        </Button>
      </DialogActions>
    </Dialog>
  );
}
