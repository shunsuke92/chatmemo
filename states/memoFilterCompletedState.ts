import { selector } from 'recoil';

import { processForCompleted } from '../utils/processForCompleted';
import { memoState } from './memoState';

export const memoFilterCompletedState = selector({
  key: 'memoFilterCompletedState',
  get: ({ get }) => {
    // 「実行済み」でフィルター
    return processForCompleted(get(memoState));
  },
});
