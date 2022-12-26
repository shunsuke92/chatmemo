import { Memo } from '../states/memoState';
import { InternalData } from '../components/Timeline';

export const convertInternalDataToMemo = (data: Memo): InternalData => {
  const res: InternalData = {
    type: 'memo',
    id: data._id,
    body: data.body,
    text: data._text,
    createdAt: data.createdAt,
    updatedAt: data.updatedAt,
    date: data._date,
    time: data._time,
    synchronized: data._synchronized,
    completed: data._tmpCompleted,
    comments: data.comments,
  };

  return res;
};
