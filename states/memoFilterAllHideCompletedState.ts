import { selector } from 'recoil';

import { memoState } from './memoState';
import { processForAllHideCompleted } from '../utils/processForAllHideCompleted';

export const memoFilterAllHideCompletedState = selector({
  key: 'memoFilterAllHideCompletedState',
  get: ({ get }) => {
    // 「すべてのメモ + 実行済み非表示」でフィルター
    return processForAllHideCompleted(get(memoState));
  },
});
