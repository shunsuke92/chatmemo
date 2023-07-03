import { createContext, useState, useContext, useEffect, useCallback, useRef } from 'react';

import { useSetRecoilState } from 'recoil';

import { isOnlineState } from '../states/isOnlineState';
import { isSynchronizingState } from '../states/isSynchronizingState';
import { synchronizingProgressState } from '../states/synchronizingProgressState';

export interface Synchronization {
  setUnsynchronizedFunction: (func: () => () => Promise<boolean> | Promise<number>) => void;
}

const SynchronizationContext = createContext<Synchronization | null>(null);

export const useSynchronizationContext = () => {
  return useContext(SynchronizationContext);
};

export const SynchronizationProvider = ({ children }: { children: any }) => {
  const setIsSynchronizing = useSetRecoilState(isSynchronizingState);
  const setSynchronizingProgress = useSetRecoilState(synchronizingProgressState);

  const unsynchronizedFunction = useRef<(() => () => Promise<boolean> | Promise<number>)[]>([]);
  const [standby, setStandby] = useState(false);
  const synchronizing = useRef(false);

  const setIsOnline = useSetRecoilState(isOnlineState);

  const setUnsynchronizedFunction = async (
    func: () => () => Promise<boolean> | Promise<number>,
  ) => {
    unsynchronizedFunction.current.push(func);
    setStandby(true);
  };

  const synchronizationProcess = useCallback(async () => {
    synchronizing.current = true;

    // 同期画面を表示
    setIsSynchronizing(true);
    const total = unsynchronizedFunction.current.length;
    setSynchronizingProgress(0);

    for (let i = 0; unsynchronizedFunction.current.length > 0; i++) {
      const func = unsynchronizedFunction.current[0];

      const executionFunction = func();
      const result = await executionFunction();

      if (result === true || result !== -1) {
        unsynchronizedFunction.current.shift();
        setSynchronizingProgress(((i + 2) / total) * 100);
      } else {
        break;
      }
    }

    if (unsynchronizedFunction.current.length === 0) {
      setStandby(false);
    }

    // 同期画面を非表示
    setIsSynchronizing(false);

    synchronizing.current = false;
  }, [setIsSynchronizing, setSynchronizingProgress]);

  useEffect(() => {
    window.addEventListener('online', checkOnline);
    window.addEventListener('offline', checkOnline);
    return () => {
      window.removeEventListener('online', checkOnline);
      window.removeEventListener('offline', checkOnline);
    };
  });

  const checkOnline = () => {
    if (navigator.onLine) {
      if (standby) {
        synchronizationProcess();
      }
      setIsOnline(true);
    } else {
      setIsOnline(false);
    }
  };

  const value: Synchronization = {
    setUnsynchronizedFunction: setUnsynchronizedFunction,
  };

  return (
    <SynchronizationContext.Provider value={value}>{children}</SynchronizationContext.Provider>
  );
};
