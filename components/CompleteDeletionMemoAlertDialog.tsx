import { useRecoilValue } from 'recoil';
import { useSetRecoilState } from 'recoil';

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import { useOperateCompleteDeletionMemo } from '../hooks/useOperateCompleteDeletionMemo';
import { deleteIDState } from '../states/deleteIDState';
import { displayAlertDialogState } from '../states/displayAlertDialogState';

export const CompleteDeletionMemoAlertDialog = () => {
  const completeDeletionMemo = useOperateCompleteDeletionMemo();

  const displayAlertDialog = useRecoilValue(displayAlertDialogState);
  const deleteID = useRecoilValue(deleteIDState);
  const setDisplayAlertDialog = useSetRecoilState(displayAlertDialogState);

  const isDisplay: boolean = displayAlertDialog === 'complete-deletion-memo';

  const handleClick = () => {
    completeDeletionMemo(deleteID);

    // ダイアログを閉じる
    setDisplayAlertDialog(undefined);
  };

  const handleClose = () => {
    // ダイアログを閉じる
    setDisplayAlertDialog(undefined);
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
};
