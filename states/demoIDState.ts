import { atom } from 'recoil';

export const demoIDState = atom<number>({
  key: 'demoIDState',
  default: 1000,
});
