import { useSetRecoilState } from 'recoil';

import { displayAlertDialogState } from '../states/displayAlertDialogState';

export const useClearDisplayAlertDialog = () => {
  const setDisplayAlertDialog = useSetRecoilState(displayAlertDialogState);

  const clearDisplayAlertDialog = () => {
    setDisplayAlertDialog('');
  };

  return clearDisplayAlertDialog;
};
