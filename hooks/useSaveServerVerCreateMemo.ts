import { useOperateUpdateSynchronizedFlag } from './useOperateUpdateSynchronizedFlag';
import { useManageTentativeIDContext } from '../components/ManageTentativeIDContext';
import { useSynchronizationContext } from '../components/SynchronizationContext';

export const useSaveServerVerCreateMemo = () => {
  const synchronization = useSynchronizationContext();
  const changeSynchronizedFlag = useOperateUpdateSynchronizedFlag();
  const manageID = useManageTentativeIDContext();

  const saveServerVerCreateMemo = async (
    func: () => Promise<number>,
    errMemoID: string,
  ): Promise<number> => {
    const convertForSynchronization = (func: () => Promise<number>, errMemoID: string) => {
      // 通信可能になったら実行する関数
      return async () => {
        const result = await func();

        // 通信成功のとき
        if (result !== -1) {
          // 同期済みフラグをオンにする
          changeSynchronizedFlag(errMemoID);
          // サーバーで決定したIDをID管理に保存する
          manageID?.setConfirmedID(errMemoID, result);
        }

        return result;
      };
    };

    const saveUnexecutedProcess = (func: () => Promise<number>, errMemoID: string) => {
      manageID?.createManageID(errMemoID);
      synchronization?.setUnsynchronizedFunction(() => convertForSynchronization(func, errMemoID));
    };

    const result = await func();

    // 通信に失敗したとき
    if (result === -1) {
      saveUnexecutedProcess(func, errMemoID);
    }

    return result;
  };

  return saveServerVerCreateMemo;
};
