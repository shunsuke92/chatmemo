import { getNowDate } from '../utils/getNowDate';
import { useLocalUpdateMemo, ChangeableMemo } from './useLocalUpdateData';
import { useSaveServer } from './useSaveServer';
import { useServerUpdateMemoTable } from './useServerUpdateMemoTable';

export const useOperateDeleteMemo = () => {
  const saveServer = useSaveServer();
  const serverUpdateMemoTable = useServerUpdateMemoTable();
  const localUpdateMemo = useLocalUpdateMemo();

  const deleteMemo = async (id: string | undefined) => {
    if (id === undefined) return;

    const date = getNowDate();

    let setData: ChangeableMemo = {};

    setData.deleted = true;
    setData.deletedAt = date;

    const result = await saveServer(() => serverUpdateMemoTable(id, setData), id);

    if (result) {
      setData._synchronized = true;
    } else {
      setData._synchronized = false;
    }

    localUpdateMemo(id, setData);
  };

  return deleteMemo;
};
