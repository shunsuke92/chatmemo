import { useSetRecoilState } from 'recoil';

import { deleteIDState } from '../states/deleteIDState';
import { displayAlertDialogState, AlertDialog } from '../states/displayAlertDialogState';

export const useChangeDisplayAlertDialog = () => {
  const setDisplayAlertDialog = useSetRecoilState(displayAlertDialogState);
  const setDeleteID = useSetRecoilState(deleteIDState);

  const changeDisplayAlertDialog = (value: AlertDialog, deleteID?: string) => {
    setDisplayAlertDialog(value);
    if (deleteID !== undefined) {
      setDeleteID(deleteID);
    } else {
      setDeleteID('');
    }
  };

  return changeDisplayAlertDialog;
};
