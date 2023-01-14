import { useSynchronizationContext } from '../components/SynchronizationContext';
import { useOperateUpdateSynchronizedFlag } from './useOperateUpdateSynchronizedFlag';

export const useSaveServer = () => {
  const synchronization = useSynchronizationContext();
  const changeSynchronizedFlag = useOperateUpdateSynchronizedFlag();

  const saveServer = async (
    func: () => Promise<boolean>,
    memoID: string,
    commentID?: string,
  ): Promise<boolean> => {
    const convertForSynchronization = (
      func: () => Promise<boolean>,
      memoID: string,
      commentID?: string,
    ) => {
      // 通信可能になったら実行する関数
      return async () => {
        const result = await func();
        // 通信成功のとき
        if (result) {
          // 同期済みフラグをオンにする
          changeSynchronizedFlag(memoID, commentID);
        }
        return result;
      };
    };

    const saveUnexecutedProcess = (
      func: () => Promise<boolean>,
      memoID: string,
      commentID?: string,
    ) => {
      synchronization?.setUnsynchronizedFunction(() =>
        convertForSynchronization(func, memoID, commentID),
      );
    };

    const result = await func();

    // 通信に失敗したとき
    if (!result) {
      saveUnexecutedProcess(func, memoID, commentID);
    }

    return result;
  };

  return saveServer;
};
