import { atom } from 'recoil';

export const isLogginginState = atom<boolean>({
  key: 'isLogginginState',
  default: false,
});
