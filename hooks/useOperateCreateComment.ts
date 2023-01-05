import { getNowDate } from '../utils/getNowDate';
import { getDate } from '../utils/getDate';
import { getTime } from '../utils/getTime';
import { useRecoilValue } from 'recoil';
import { createErrIDState } from '../states/createErrIDState';
import { Comment } from '../states/memoState';
import { useSaveServerVerCreateComment } from './useSaveServerVerCreateComment';
import { useServerCreateCommentTable } from './useServerCreateCommentTable';
import { useLocalCreateComment } from './useLocalCreateComment';
import { useSetRecoilState } from 'recoil';
import { scrollingIDState } from '../states/scrollingIDState';

export const useOperateCreateComment = () => {
  const createErrID = useRecoilValue(createErrIDState);
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
    const ErrID = createErrID();

    const result = await saveServerVerCreateComment(
      () => serverCreateCommentTable(id, comment),
      id,
      ErrID,
    );

    if (result !== -1) {
      comment._synchronized = true;
      comment._id = result.toString();
    } else {
      comment._synchronized = false;
      comment._id = ErrID;
    }

    localAddComment(id, comment);

    // スクロール予約
    setScrollingID(id);
  };

  return createComment;
};
