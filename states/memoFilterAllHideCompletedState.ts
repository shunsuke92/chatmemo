import { selector } from 'recoil';
import { memoState } from './memoState';

export const memoFilterAllHideCompletedState = selector({
  key: 'memoFilterAllHideCompletedState',
  get: ({ get }) => {
    // 「すべてのメモ + 実行済み非表示」でフィルター
    const filterMemo =
      get(memoState)
        .filter((d) => !d.deleted && !d.completed)
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
