import { atom } from 'recoil';

export const displayStepState = atom<number>({
  key: 'displayStepState',
  default: 1,
});
