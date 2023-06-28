import { selector } from 'recoil';

import { memoState } from './memoState';
import { processForTrash } from '../utils/processForTrash';

export const memoFilterTrashState = selector({
  key: 'memoFilterTrashState',
  get: ({ get }) => {
    // 「ごみ箱」でフィルター
    return processForTrash(get(memoState));
  },
});
