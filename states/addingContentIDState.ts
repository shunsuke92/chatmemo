import { atom } from 'recoil';

export const addingContentIDState = atom<string>({
  key: 'addingContentIDState',
  default: '',
});
