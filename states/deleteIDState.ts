import { atom } from 'recoil';

export const deleteIDState = atom<string>({
  key: 'deleteIDState',
  default: '',
});
