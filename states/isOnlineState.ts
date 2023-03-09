import { atom } from 'recoil';

export const isOnlineState = atom<boolean>({
  key: 'isOnlineState',
  default: true,
});
