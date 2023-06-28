import { selector } from 'recoil';

import { displayingMemoState } from './displayingMemoState';
import { processForTrash } from '../utils/processForTrash';

export const displayingMemoFilterTrashState = selector({
  key: 'displayingMemoFilterTrashState',
  get: ({ get }) => {
    // 「ごみ箱」でフィルター
    return processForTrash(get(displayingMemoState));
  },
});
