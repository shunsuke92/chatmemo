import { useRecoilValue } from 'recoil';
import { useSetRecoilState } from 'recoil';

import { Comment } from '../states/memoState';
import { scrollingIDState } from '../states/scrollingIDState';
import { getDate } from '../utils/getDate';
import { getNowDate } from '../utils/getNowDate';
import { getTime } from '../utils/getTime';
import { useCreateErrID } from './useCreateErrID';
import { useLocalCreateComment } from './useLocalCreateComment';
import { useSaveServerVerCreateComment } from './useSaveServerVerCreateComment';
import { useServerCreateCommentTable } from './useServerCreateCommentTable';

export const useOperateCreateComment = () => {
  const createErrID = useCreateErrID();
  const saveServerVerCreateComment = useSaveServerVerCreateComment();
  const serverCreateCommentTable = useServerCreateCommentTable();
  const localAddComment = useLocalCreateComment();
  const setScrollingID = useSetRecoilState(scrollingIDState);

  const createComment = async (comment: Comment, id: string) => {
    const date = getNowDate();
    comment.createdAt = date;
    comment.updatedAt = date;
    comment.deletedAt = date;
    comment._date = getDate(date);
    comment._time = getTime(date);
    comment._memoId = id;
    const errID = createErrID();

    const result = await saveServerVerCreateComment(
      () => serverCreateCommentTable(id, comment),
      id,
      errID,
    );

    if (result !== -1) {
      comment._synchronized = true;
      comment._id = result.toString();
    } else {
      comment._synchronized = false;
      comment._id = errID;
    }

    localAddComment(id, comment);

    // スクロール予約
    setScrollingID(id);
  };

  return createComment;
};
