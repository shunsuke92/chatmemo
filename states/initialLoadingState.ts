import { atom } from 'recoil';

export const initialLoadingState = atom<number>({
  key: 'initialLoadingState',
  default: 0,
});
