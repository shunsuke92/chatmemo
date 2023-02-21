import { selector } from 'recoil';

import { processForTrash } from '../utils/processForTrash';
import { displayingMemoState } from './displayingMemoState';

export const displayingMemoFilterTrashState = selector({
  key: 'displayingMemoFilterTrashState',
  get: ({ get }) => {
    // 「ごみ箱」でフィルター
    return processForTrash(get(displayingMemoState));
  },
});
