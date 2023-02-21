import { selector } from 'recoil';

import { processForFilterAll } from '../utils/processForFilterAll';
import { displayingMemoState } from './displayingMemoState';

export const displayingMemoFilterAllState = selector({
  key: 'displayingMemoFilterAllState',
  get: ({ get }) => {
    // 「すべてのメモ + 実行済み表示」でフィルター
    return processForFilterAll(get(displayingMemoState));
  },
});
