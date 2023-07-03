import { atom } from 'recoil';

export const editingContentIDState = atom<string | undefined>({
  key: 'editingContentIDState',
  default: undefined,
});
