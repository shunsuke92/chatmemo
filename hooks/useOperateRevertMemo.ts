import { useSaveServer } from './useSaveServer';
import { useServerUpdateMemoTable } from './useServerUpdateMemoTable';
import { useLocalUpdateMemo, ChangeableMemo } from './useLocalUpdateData';

export const useOperateRevertMemo = () => {
  const saveServer = useSaveServer();
  const serverUpdateMemoTable = useServerUpdateMemoTable();
  const localUpdateMemo = useLocalUpdateMemo();

  const revertMemo = async (id: string | undefined) => {
    if (id === undefined) return;

    let setData: ChangeableMemo = {};

    setData.deleted = false;

    const result = await saveServer(() => serverUpdateMemoTable(id, setData), id);

    if (result) {
      setData._synchronized = true;
    } else {
      setData._synchronized = false;
    }

    localUpdateMemo(id, setData);
  };

  return revertMemo;
};
