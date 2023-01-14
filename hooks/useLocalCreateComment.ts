import { useSetRecoilState } from 'recoil';

import { Comment, memoState } from '../states/memoState';

export const useLocalCreateComment = () => {
  const setMemo = useSetRecoilState(memoState);

  const localAddComment = (memoId: string, comment: Comment) => {
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
  };
  return localAddComment;
};
