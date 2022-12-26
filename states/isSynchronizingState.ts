import { atom } from 'recoil';

export const isSynchronizingState = atom<boolean>({
  key: 'isSynchronizingState',
  default: false,
});
