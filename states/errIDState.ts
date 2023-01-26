import { atom } from 'recoil';

export const errIDState = atom<number>({
  key: 'errIDState',
  default: 0,
});
