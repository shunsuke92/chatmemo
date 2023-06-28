import { selector } from 'recoil';

import { memoState } from './memoState';
import { processForCompleted } from '../utils/processForCompleted';

export const memoFilterCompletedState = selector({
  key: 'memoFilterCompletedState',
  get: ({ get }) => {
    // 「実行済み」でフィルター
    return processForCompleted(get(memoState));
  },
});
