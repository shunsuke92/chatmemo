import { Memo } from '../types/index';

export const processForTrash = (memo: Memo[]) => {
  return (
    memo
      .filter((d) => d.deleted)
      .map((d) => {
        const data = {
          ...d,
          comments: d.comments.filter((d) => !d.deleted),
        };
        return data;
      }) ?? []
  );
};
