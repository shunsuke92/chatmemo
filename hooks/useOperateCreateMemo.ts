import { getNowDate } from '../utils/getNowDate';
import { getDate } from '../utils/getDate';
import { getTime } from '../utils/getTime';
import { useRecoilValue } from 'recoil';
import { createErrIDState } from '../states/createErrIDState';
import { Memo } from '../states/memoState';
import { useSaveServerVerCreateMemo } from './useSaveServerVerCreateMemo';
import { useServerCreateMemoTable } from './useServerCreateMemoTable';
import { useLocalCreateMemo } from './useLocalCreateMemo';
import { useChangeScheduledScrolling } from '../hooks/useChangeScheduledScrolling';

export const useOperateCreateMemo = () => {
  const createErrID = useRecoilValue(createErrIDState);
  const saveServerVerCreateMemo = useSaveServerVerCreateMemo();
  const serverCreateMemoTable = useServerCreateMemoTable();
  const localAddMemo = useLocalCreateMemo();

  const changeScheduledScrolling = useChangeScheduledScrolling();

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
    changeScheduledScrolling(true);
  };

  return createMemo;
};
