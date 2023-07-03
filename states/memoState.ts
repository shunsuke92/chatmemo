import { atom } from 'recoil';

import { Memo } from '../types/index';

export const memoState = atom<Memo[]>({
  key: 'memoState',
  default: [],
});
