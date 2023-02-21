import { selector } from 'recoil';

import { processForTrash } from '../utils/processForTrash';
import { memoState } from './memoState';

export const memoFilterTrashState = selector({
  key: 'memoFilterTrashState',
  get: ({ get }) => {
    // 「ごみ箱」でフィルター
    return processForTrash(get(memoState));
  },
});
