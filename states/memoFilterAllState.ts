import { selector } from 'recoil';

import { memoState } from './memoState';
import { processForFilterAll } from '../utils/processForFilterAll';

export const memoFilterAllState = selector({
  key: 'memoFilterAllState',
  get: ({ get }) => {
    // 「すべてのメモ + 実行済み表示」でフィルター
    return processForFilterAll(get(memoState));
  },
});
