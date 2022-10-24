import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useDataContext } from './DataContext';
import { useOperationContext } from './OperationContext';

export default function CompleteDeletionMemoAlertDialog() {
  const data = useDataContext();
  const info = useOperationContext();

  const isDisplay: boolean = info?.displayAlertDialog === 'complete-deletion-memo' ?? false;

  const handleClick = () => {
    data?.completeDeletionMemo(info?.deleteID);

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
      <DialogTitle id='alert-dialog-title'>メモを完全に削除しますか？</DialogTitle>
      <DialogContent>
        <DialogContentText id='alert-dialog-description'>
          このメモは完全に削除されます。この操作は取消できません。
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} variant='contained' autoFocus>
          いいえ
        </Button>
        <Button onClick={handleClick} variant='outlined'>
          はい
        </Button>
      </DialogActions>
    </Dialog>
  );
}
