import { atom } from 'recoil';

export type AlertDialog = 'delete-memo' | 'delete-account' | 'complete-deletion-memo';

export const displayAlertDialogState = atom<AlertDialog | undefined>({
  key: 'displayAlertDialogState',
  default: undefined,
});
