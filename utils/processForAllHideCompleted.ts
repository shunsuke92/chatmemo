import { Memo } from '../states/memoState';

export const processForAllHideCompleted = (memo: Memo[]) => {
  return (
    memo
      .filter((d) => !d.deleted && !d.completed)
      .map((d) => {
        const data = {
          ...d,
          comments: d.comments.filter((d) => !d.deleted),
        };
        return data;
      }) ?? []
  );
};
