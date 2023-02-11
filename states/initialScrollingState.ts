import { atom } from 'recoil';

export const initialScrollingState = atom<boolean>({
  key: 'initialScrollingState',
  default: false,
});
