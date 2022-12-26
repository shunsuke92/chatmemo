import { atom } from 'recoil';

export const resetDisplayPositionState = atom<boolean>({
  key: 'resetDisplayPositionState',
  default: false,
});
