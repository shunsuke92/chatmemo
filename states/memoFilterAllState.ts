import { selector } from 'recoil';

import { processForFilterAll } from '../utils/processForFilterAll';
import { memoState } from './memoState';

export const memoFilterAllState = selector({
  key: 'memoFilterAllState',
  get: ({ get }) => {
    // 「すべてのメモ + 実行済み表示」でフィルター
    return processForFilterAll(get(memoState));
  },
});
