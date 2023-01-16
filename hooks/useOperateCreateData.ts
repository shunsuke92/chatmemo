import { useRecoilValue } from 'recoil';

import { useGetIsAdding } from '../components/Main';
import { useOperateCreateComment } from '../hooks/useOperateCreateComment';
import { useOperateCreateMemo } from '../hooks/useOperateCreateMemo';
import { addingContentIDState } from '../states/addingContentIDState';

export const useOperateCreateData = () => {
  const createMemo = useOperateCreateMemo();
  const createComment = useOperateCreateComment();

  const isAdding = useGetIsAdding();

  const addingContentID = useRecoilValue(addingContentIDState);

  const createData = (value: string) => {
    if (isAdding) {
      createComment(
        {
          id: 0,
          body: value,
          createdAt: '',
          updatedAt: '',
          deleted: false,
          deletedAt: '',
          _text: value.split(/\r\n|\n|\r/gm),
          _date: '',
          _time: '',
          _synchronized: false,
          _type: 'comment',
          _id: '',
          _memoId: '',
        },
        addingContentID,
      );
    } else {
      createMemo({
        id: 0,
        body: value,
        createdAt: '',
        updatedAt: '',
        completed: false,
        completedAt: '',
        deleted: false,
        deletedAt: '',
        comments: [],
        _text: value.split(/\r\n|\n|\r/gm),
        _date: '',
        _time: '',
        _synchronized: false,
        _tmpCompleted: false,
        _tmpCompletedAt: '',
        _type: 'memo',
        _id: '',
      });
    }
  };

  return createData;
};
