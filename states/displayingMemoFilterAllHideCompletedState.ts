import { selector } from 'recoil';

import { processForAllHideCompleted } from '../utils/processForAllHideCompleted';
import { displayingMemoState } from './displayingMemoState';

export const displayingMemoFilterAllHideCompletedState = selector({
  key: 'displayingMemoFilterAllHideCompletedState',
  get: ({ get }) => {
    // 「すべてのメモ + 実行済み非表示」でフィルター
    return processForAllHideCompleted(get(displayingMemoState));
  },
});
