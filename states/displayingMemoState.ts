import { atom } from 'recoil';

import { Memo } from './memoState';

export const displayingMemoState = atom<Memo[]>({
  key: 'displayingMemoState',
  default: [],
});
