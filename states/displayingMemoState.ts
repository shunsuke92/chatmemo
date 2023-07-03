import { atom } from 'recoil';

import { Memo } from '../types/index';

export const displayingMemoState = atom<Memo[]>({
  key: 'displayingMemoState',
  default: [],
});
