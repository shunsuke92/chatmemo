import { selector } from 'recoil';

import { displayingMemoState } from './displayingMemoState';
import { processForAllHideCompleted } from '../utils/processForAllHideCompleted';

export const displayingMemoFilterAllHideCompletedState = selector({
  key: 'displayingMemoFilterAllHideCompletedState',
  get: ({ get }) => {
    // 「すべてのメモ + 実行済み非表示」でフィルター
    return processForAllHideCompleted(get(displayingMemoState));
  },
});
