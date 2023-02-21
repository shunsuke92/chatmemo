import { atom } from 'recoil';

export const changeDisplayStepState = atom<boolean>({
  key: 'changeDisplayStepState',
  default: false,
});
