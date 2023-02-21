import { atom } from 'recoil';

export const isAllDisplayedState = atom<boolean>({
  key: 'isAllDisplayedState',
  default: true,
});
