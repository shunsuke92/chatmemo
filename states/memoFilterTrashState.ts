import { selector } from 'recoil';
import { memoState } from './memoState';

export const memoFilterTrashState = selector({
  key: 'memoFilterTrashState',
  get: ({ get }) => {
    // 「ごみ箱」でフィルター
    const filterMemo =
      get(memoState)
        .filter((d) => d.deleted)
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
