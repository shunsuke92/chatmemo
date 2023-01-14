import { InternalData } from '../components/Timeline';
import { Comment } from '../states/memoState';

export const convertInternalDataToComment = (data: Comment): InternalData => {
  const res: InternalData = {
    type: 'comment',
    id: data._id,
    memoID: data._memoId,
    body: data.body,
    text: data._text,
    createdAt: data.createdAt,
    updatedAt: data.updatedAt,
    date: data._date,
    time: data._time,
    synchronized: data._synchronized,
  };

  return res;
};
