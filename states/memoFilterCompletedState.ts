import { selector } from 'recoil';

import { memoState } from './memoState';

export const memoFilterCompletedState = selector({
  key: 'memoFilterCompletedState',
  get: ({ get }) => {
    // 「実行済み」でフィルター
    const filterMemo =
      get(memoState)
        .filter((d) => !d.deleted && d.completed)
        .map((d) => {
          const data = {
            ...d,
            comments: d.comments.filter((d) => !d.deleted),
          };
          return data;
        }) ?? [];
    return filterMemo;
  },
});
