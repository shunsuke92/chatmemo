import { useLocalUpdateMemo, ChangeableMemo } from './useLocalUpdateData';
import { useSaveServer } from './useSaveServer';
import { useServerUpdateMemoTable } from './useServerUpdateMemoTable';

export const useOperateUpdateServerCompleted = () => {
  const localUpdateData = useLocalUpdateMemo();
  const saveServer = useSaveServer();
  const serverUpdateMemoTable = useServerUpdateMemoTable();

  const updateServerCompleted = async (id: string, value: boolean, date?: string) => {
    let targetMemoForLocal: ChangeableMemo = {};

    let targetMemoForServer: ChangeableMemo = {};

    targetMemoForLocal._tmpCompleted = value;
    targetMemoForServer.completed = value;

    if (date) {
      targetMemoForLocal._tmpCompletedAt = date;
      targetMemoForServer.completedAt = date;
    }

    const result = await saveServer(() => serverUpdateMemoTable(id, targetMemoForServer), id);

    if (result) {
      targetMemoForLocal._synchronized = true;
    } else {
      targetMemoForLocal._synchronized = false;
    }

    localUpdateData(id, targetMemoForLocal);
  };

  return updateServerCompleted;
};
