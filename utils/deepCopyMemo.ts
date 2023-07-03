import { Memo } from '../types/index';

export const deepCopyMemo = (memo: Memo) => {
  const copyMemo = { ...memo };
  const copyComments = memo.comments.map((comment) => ({ ...comment }));
  copyMemo.comments = copyComments;

  return copyMemo;
};
