import { atom } from 'recoil';

export const openMenuDelayState = atom<boolean>({
  key: 'openMenuDelayState',
  default: false,
});
