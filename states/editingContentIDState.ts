import { atom } from 'recoil';

export const editingContentIDState = atom<string>({
  key: 'editingContentIDState',
  default: '',
});
