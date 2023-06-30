import { atom } from 'recoil';

export const synchronizingProgressState = atom<number>({
  key: 'synchronizingProgressState',
  default: 100,
});
