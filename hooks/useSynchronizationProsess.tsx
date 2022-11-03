import { useState, useEffect, useRef, useCallback } from 'react';
import { useAuthContext } from '../components/AuthContext';
import { useOperationContext } from '../components/OperationContext';
import { useManageID } from './useManageID';
import axios from 'axios';

export const useSynchronizationProsess = () => {
  const userInfo = useAuthContext();
  const user = userInfo?.user;
  const info = useOperationContext();
  const manageMemoID = useManageID();
  const manageCommentID = useManageID();

  const CONNECTION_CHECK_INTERVAL = 2000;
  const SYNCHRONIZATION_INTERVAL = 300;

  const unsynchronizedFunction = useRef<(() => () => Promise<boolean> | Promise<number>)[]>([]);
  const [standby, setStandby] = useState(false);
  const synchronizing = useRef(false);

  const setUnsynchronizedFunction = async (
    func: () => () => Promise<boolean> | Promise<number>,
  ) => {
    unsynchronizedFunction.current.push(func);
    setStandby(true);
  };

  const synchronizationProcess = useCallback(async () => {
    synchronizing.current = true;

    // 同期画面を表示
    info?.changeIsSynchronizing(true);
    const total = unsynchronizedFunction.current.length;
    info?.changeSynchronizingProgress(0);

    for (let i = 0; unsynchronizedFunction.current.length > 0; i++) {
      // 初回以外のときは、遅延実行する
      if (i !== 0) {
        await sleep(SYNCHRONIZATION_INTERVAL);
      }

      const func = unsynchronizedFunction.current[0];

      const executionFunction = func();
      const result = await executionFunction();

      if (result || result !== -1) {
        unsynchronizedFunction.current.shift();
        info?.changeSynchronizingProgress(((i + 2) / total) * 100);
      } else {
        break;
      }
    }

    if (unsynchronizedFunction.current.length === 0) {
      setStandby(false);
    }

    // 同期画面を非表示
    info?.changeIsSynchronizing(false);
    info?.changeSynchronizingProgress(0);

    synchronizing.current = false;
  }, [info]);

  const checkConnection = useCallback(async () => {
    // 同期中は接続確認しない
    if (synchronizing.current) return;

    // 接続確認
    let result;
    if (user) {
      const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/users/${user.uid}/`);
      result = Boolean(res.data);
    }

    // 接続できたとき
    if (result) {
      synchronizationProcess();
    }
  }, [user, synchronizationProcess]);

  useEffect(() => {
    if (standby) {
      // 未同期の処理が発生したら接続確認開始
      const id: NodeJS.Timer = setInterval(() => checkConnection(), CONNECTION_CHECK_INTERVAL);
      return () => clearInterval(id);
    }
  }, [checkConnection, standby]);

  const sleep = (second: number) => {
    // 同期的に処理を止める
    return new Promise((resolve) => setTimeout(resolve, second));
  };

  const functions = {
    setUnsynchronizedFunction: setUnsynchronizedFunction,
    createManageMemoID: manageMemoID.createManageID,
    createManageCommentID: manageCommentID.createManageID,
    setConfirmedMemoID: manageMemoID.setConfirmedID,
    setConfirmedCommentID: manageCommentID.setConfirmedID,
    getConfirmedMemoID: manageMemoID.getConfirmedID,
    getConfirmedCommentID: manageCommentID.getConfirmedID,
  };

  return functions;
};
