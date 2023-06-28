import { useSetRecoilState } from 'recoil';

import { useCreateErrID } from './useCreateErrID';
import { useLocalCreateMemo } from './useLocalCreateMemo';
import { useSaveServerVerCreateMemo } from './useSaveServerVerCreateMemo';
import { useServerCreateMemoTable } from './useServerCreateMemoTable';
import { Memo } from '../states/memoState';
import { scheduledScrollingState } from '../states/scheduledScrollingState';
import { getDate } from '../utils/getDate';
import { getNowDate } from '../utils/getNowDate';
import { getTime } from '../utils/getTime';

export const useOperateCreateMemo = () => {
  const createErrID = useCreateErrID();
  const saveServerVerCreateMemo = useSaveServerVerCreateMemo();
  const serverCreateMemoTable = useServerCreateMemoTable();
  const localAddMemo = useLocalCreateMemo();

  const setScheduledScrolling = useSetRecoilState(scheduledScrollingState);

  const createMemo = async (memo: Memo) => {
    const date = getNowDate();
    memo.createdAt = date;
    memo.updatedAt = date;
    memo.completedAt = date;
    memo.deletedAt = date;
    memo._date = getDate(date);
    memo._time = getTime(date);
    const errID = createErrID();

    const result = await saveServerVerCreateMemo(() => serverCreateMemoTable(memo), errID);

    if (result !== -1) {
      memo._synchronized = true;
      memo._id = result.toString();
    } else {
      memo._synchronized = false;
      memo._id = errID;
    }

    localAddMemo(memo);

    // スクロール予約
    setScheduledScrolling(true);
  };

  return createMemo;
};
