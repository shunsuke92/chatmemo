import { selector } from 'recoil';

import { processForAllHideCompleted } from '../utils/processForAllHideCompleted';
import { memoState } from './memoState';

export const memoFilterAllHideCompletedState = selector({
  key: 'memoFilterAllHideCompletedState',
  get: ({ get }) => {
    // 「すべてのメモ + 実行済み非表示」でフィルター
    return processForAllHideCompleted(get(memoState));
  },
});
