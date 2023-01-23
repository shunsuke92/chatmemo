import { useSetRecoilState } from 'recoil';

import { editingInfoState } from '../states/editingInfoState';

export const useUpdateEditingInfoAfter = () => {
  const setEditingInfo = useSetRecoilState(editingInfoState);

  const updateEditingInfoAfter = (text: string, commentID?: string) => {
    if (commentID === undefined) {
      setEditingInfo((prevState) =>
        prevState !== undefined
          ? { ...prevState, after: { ...prevState.after, body: text } }
          : undefined,
      );
    } else {
      setEditingInfo((prevState) =>
        prevState !== undefined
          ? {
              ...prevState,
              after: {
                ...prevState.after,
                comments: prevState.after.comments.map((comment) => {
                  if (comment.id === commentID) {
                    return { ...comment, body: text };
                  }
                  return comment;
                }),
              },
            }
          : undefined,
      );
    }
  };

  return updateEditingInfoAfter;
};
