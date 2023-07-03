import { atom } from 'recoil';

export const initialServerAccessedState = atom<number>({
  key: 'initialServerAccessedState',
  default: 0,
});
