import { useSetRecoilState } from 'recoil';

import { InternalData } from '../components/Timeline';
import { editingInfoState } from '../states/editingInfoState';

export const useCreateEditingInfo = () => {
  const setEditingInfo = useSetRecoilState(editingInfoState);

  const createEditingContentInfo = (data: InternalData) => {
    if (data.comments === undefined) return;
    const commentBefore = data.comments.map((comment) => {
      return {
        id: comment._id,
        body: comment.body,
      };
    });
    const commentAfter = data.comments.map((comment) => {
      return {
        id: comment._id,
        body: comment.body,
      };
    });

    const contentBefore = {
      id: data.id,
      body: data.body,
      comments: commentBefore,
    };

    const contentAfter = {
      id: data.id,
      body: data.body,
      comments: commentAfter,
    };

    const editingInfo = { before: contentBefore, after: contentAfter };

    setEditingInfo(editingInfo);
  };

  return createEditingContentInfo;
};
