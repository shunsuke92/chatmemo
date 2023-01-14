import { useManageTentativeIDContext } from '../components/ManageTentativeIDContext';
import { useSynchronizationContext } from '../components/SynchronizationContext';
import { useOperateUpdateSynchronizedFlag } from './useOperateUpdateSynchronizedFlag';

export const useSaveServerVerCreateComment = () => {
  const changeSynchronizedFlag = useOperateUpdateSynchronizedFlag();
  const manageID = useManageTentativeIDContext();
  const synchronization = useSynchronizationContext();

  const saveServerVerCreateComment = async (
    func: () => Promise<number>,
    memoID: string,
    errCommentID: string,
  ): Promise<number> => {
    const convertForSynchronization = (
      func: () => Promise<number>,
      memoID: string,
      errCommentID: string,
    ) => {
      // 通信可能になったら実行する関数
      return async () => {
        const result = await func();

        // 通信成功のとき
        if (result !== -1) {
          // 同期済みフラグをオンにする
          changeSynchronizedFlag(memoID, errCommentID);

          // サーバーで決定したIDをID管理に保存する
          manageID?.setConfirmedID(errCommentID, result);
        }

        return result;
      };
    };

    const saveUnexecutedProcess = (
      func: () => Promise<number>,
      memoID: string,
      errCommentID: string,
    ) => {
      manageID?.createManageID(errCommentID);

      synchronization?.setUnsynchronizedFunction(() =>
        convertForSynchronization(func, memoID, errCommentID),
      );
    };

    const result = await func();

    // 通信に失敗したとき
    if (result === -1) {
      saveUnexecutedProcess(func, memoID, errCommentID);
    }

    return result;
  };

  return saveServerVerCreateComment;
};
