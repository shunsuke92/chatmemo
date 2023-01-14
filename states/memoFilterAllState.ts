import { selector } from 'recoil';

import { memoState } from './memoState';

export const memoFilterAllState = selector({
  key: 'memoFilterAllState',
  get: ({ get }) => {
    // 「すべてのメモ + 実行済み表示」でフィルター
    const filterMemo =
      get(memoState)
        .filter((d) => !d.deleted)
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
