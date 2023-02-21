import { atom } from 'recoil';

export const changeMemoState = atom<boolean>({
  key: 'changeMemoState',
  default: false,
});
