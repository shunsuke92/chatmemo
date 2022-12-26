import { atom } from 'recoil';

export const openSideDrawerState = atom<boolean>({
  key: 'openSideDrawerState',
  default: false,
});
