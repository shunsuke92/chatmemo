import { useLocalDeleteMemo } from './useLocalUpdateData';
import { useSaveServer } from './useSaveServer';
import { useServerDeleteMemoTable } from './useServerDeleteMemoTable';

export const useOperateCompleteDeletionMemo = () => {
  const saveServer = useSaveServer();
  const serverDeleteMemoTable = useServerDeleteMemoTable();
  const localDeleteMemo = useLocalDeleteMemo();

  const completeDeletionMemo = async (id: string | undefined) => {
    if (id === undefined) return;

    // サーバーから完全削除
    await saveServer(() => serverDeleteMemoTable(id), id);

    // ローカルから完全削除
    localDeleteMemo(id);
  };

  return completeDeletionMemo;
};
