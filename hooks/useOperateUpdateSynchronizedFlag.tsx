import { useLocalUpdateMemo, useLocalUpdateComment } from './useLocalUpdateData';

export const useOperateUpdateSynchronizedFlag = () => {
  const localUpdateMemo = useLocalUpdateMemo();
  const localUpdateComment = useLocalUpdateComment();

  const changeSynchronizedFlag = (memoID: string, commentID?: string) => {
    if (commentID === undefined) {
      localUpdateMemo(memoID, { _synchronized: true });
    } else {
      localUpdateComment(memoID, commentID, { _synchronized: true });
    }
  };

  return changeSynchronizedFlag;
};
