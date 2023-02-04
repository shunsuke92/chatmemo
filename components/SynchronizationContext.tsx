import { createContext, useState, useContext, useEffect, useCallback, useRef } from 'react';

import { useRecoilValue } from 'recoil';

import axios from 'axios';

import { useChangeIsSynchronizing } from '../hooks/useChangeIsSynchronizing';
import { useChangeSynchronizingProgress } from '../hooks/useChangeSynchronizingProgress';
import { authUserState } from '../states/authUserState';

export interface Synchronization {
  setUnsynchronizedFunction: (func: () => () => Promise<boolean> | Promise<number>) => void;
}

const SynchronizationContext = createContext<Synchronization | null>(null);

export const useSynchronizationContext = () => {
  return useContext(SynchronizationContext);
};

export const SynchronizationProvider = ({ children }: { children: any }) => {
  const user = useRecoilValue(authUserState);

  const changeIsSynchronizing = useChangeIsSynchronizing();
  const changeSynchronizingProgress = useChangeSynchronizingProgress();

  const CONNECTION_CHECK_INTERVAL = 2000;
  const SYNCHRONIZATION_INTERVAL = 500;

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
    changeIsSynchronizing(true);
    const total = unsynchronizedFunction.current.length;
    changeSynchronizingProgress(0);

    for (let i = 0; unsynchronizedFunction.current.length > 0; i++) {
      // 初回以外のときは、遅延実行する
      if (i !== 0) {
        await sleep(SYNCHRONIZATION_INTERVAL);
      }

      const func = unsynchronizedFunction.current[0];

      const executionFunction = func();
      console.log(i + 1, '回目');
      const result = await executionFunction();
      console.log('result', result);

      if (result || result !== -1) {
        unsynchronizedFunction.current.shift();
        changeSynchronizingProgress(((i + 2) / total) * 100);
      } else {
        break;
      }
    }

    if (unsynchronizedFunction.current.length === 0) {
      setStandby(false);
    }

    // 同期画面を非表示
    changeIsSynchronizing(false);
    changeSynchronizingProgress(0);

    synchronizing.current = false;
  }, [changeIsSynchronizing, changeSynchronizingProgress]);

  const checkConnection = useCallback(async () => {
    // 同期中は接続確認しない
    if (synchronizing.current) return;

    // 接続確認
    let result;
    if (user) {
      const res = await axios.get(`/api/users/${user.uid}`);
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

  const value: Synchronization = {
    setUnsynchronizedFunction: setUnsynchronizedFunction,
  };

  return (
    <SynchronizationContext.Provider value={value}>{children}</SynchronizationContext.Provider>
  );
};
