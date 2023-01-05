import { atom } from 'recoil';

export const scrollingIDState = atom<string>({
  key: 'scrollingIDState',
  default: '',
});
