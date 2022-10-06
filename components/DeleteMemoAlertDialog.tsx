import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useDataContext } from './DataContext';
import { useOperationContext } from './OperationContext';

export default function DeleteMemoAlertDialog() {
  const data = useDataContext();
  const info = useOperationContext();

  const isDisplay: boolean = info?.displayAlertDialog === 'delete-memo' ?? false;

  const handleClick = () => {
    data?.deleteMemo(info?.deleteID);

    // ダイアログを閉じる
    info?.changeDisplayAlertDialog('');
  };

  const handleClose = () => {
    // ダイアログを閉じる
    info?.changeDisplayAlertDialog('');
  };

  return (
    <Dialog
      open={isDisplay}
      onClose={handleClose}
      aria-labelledby='alert-dialog-title'
      aria-describedby='alert-dialog-description'
    >
      <DialogTitle id='alert-dialog-title'>このメモを削除しますか？</DialogTitle>
      <DialogContent>
        <DialogContentText id='alert-dialog-description'>
          メモを削除すると、コメントもすべて削除されます。
        </DialogContentText>
        <DialogContentText id='alert-dialog-description'>
          削除したメモはごみ箱に保存され、復元することもできます。
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>いいえ</Button>
        <Button onClick={handleClick} autoFocus>
          はい
        </Button>
      </DialogActions>
    </Dialog>
  );
}
