import { selector } from 'recoil';

import { displayingMemoState } from './displayingMemoState';
import { processForFilterAll } from '../utils/processForFilterAll';

export const displayingMemoFilterAllState = selector({
  key: 'displayingMemoFilterAllState',
  get: ({ get }) => {
    // 「すべてのメモ + 実行済み表示」でフィルター
    return processForFilterAll(get(displayingMemoState));
  },
});
