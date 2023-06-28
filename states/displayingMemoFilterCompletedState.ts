import { selector } from 'recoil';

import { displayingMemoState } from './displayingMemoState';
import { processForCompleted } from '../utils/processForCompleted';

export const displayingMemoFilterCompletedState = selector({
  key: 'displayingMemoFilterCompletedState',
  get: ({ get }) => {
    // 「実行済み」でフィルター
    return processForCompleted(get(displayingMemoState));
  },
});
