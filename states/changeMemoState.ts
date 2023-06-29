import { atom } from 'recoil';

export const changeMemoState = atom<number>({
  key: 'changeMemoState',
  default: 0,
});
