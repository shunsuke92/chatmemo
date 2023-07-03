import { useSetRecoilState } from 'recoil';

import { displayingMemoState } from '../states/displayingMemoState';
import { memoState } from '../states/memoState';
import { Memo, Comment } from '../types/index';

export const useLocalCreateComment = () => {
  const setMemo = useSetRecoilState(memoState);
  const setFilteredMemo = useSetRecoilState(displayingMemoState);

  const localAddComment = (memoId: string, comment: Comment) => {
    const setData = (value: Memo): Memo => {
      if (value._id === memoId) {
        const setComment = [...value.comments, comment];
        const newMemo = { ...value, comments: setComment };
        return newMemo;
      }
      return value;
    };

    // オリジナルデータを更新
    setMemo((prevState) => prevState.map((value) => setData(value)));

    // 表示中のデータを更新
    setFilteredMemo((prevState) => prevState.map((value) => setData(value)));
  };
  return localAddComment;
};
