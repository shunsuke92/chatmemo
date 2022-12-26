import { atom } from 'recoil';

export const openUserMenuState = atom<boolean>({
  key: 'openUserMenuState',
  default: false,
});
