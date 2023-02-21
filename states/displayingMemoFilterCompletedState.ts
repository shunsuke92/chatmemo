import { selector } from 'recoil';

import { processForCompleted } from '../utils/processForCompleted';
import { displayingMemoState } from './displayingMemoState';

export const displayingMemoFilterCompletedState = selector({
  key: 'displayingMemoFilterCompletedState',
  get: ({ get }) => {
    // 「実行済み」でフィルター
    return processForCompleted(get(displayingMemoState));
  },
});
