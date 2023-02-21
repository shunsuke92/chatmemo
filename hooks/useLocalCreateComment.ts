import { useSetRecoilState } from 'recoil';

import { displayingMemoState } from '../states/displayingMemoState';
import { Comment, memoState } from '../states/memoState';

export const useLocalCreateComment = () => {
  const setMemo = useSetRecoilState(memoState);
  const setFilteredMemo = useSetRecoilState(displayingMemoState);

  // 重要：setMemoとsetFilteredMemoには同じ処理を適応すること
  const localAddComment = (memoId: string, comment: Comment) => {
    // オリジナルデータを更新
    setMemo((prevState) =>
      prevState.map((value) => {
        if (value._id === memoId) {
          const setComment = [...value.comments, comment];
          const newMemo = { ...value, comments: setComment };
          return newMemo;
        }
        return value;
      }),
    );

    // 表示中のデータを更新
    setFilteredMemo((prevState) =>
      prevState.map((value) => {
        if (value._id === memoId) {
          const setComment = [...value.comments, comment];
          const newMemo = { ...value, comments: setComment };
          return newMemo;
        }
        return value;
      }),
    );
  };
  return localAddComment;
};
