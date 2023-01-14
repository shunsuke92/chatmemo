import { createContext, useContext, useRef } from 'react';

import {
  useLocalUpdateMemoMulti,
  ChangeableMemo,
  LocalUpdateMemoProps,
} from '../hooks/useLocalUpdateData';
import { useSetTimeout } from '../hooks/useSetTimeout';

export interface DelayCompleted {
  updateLocalCompleted: (id: string, value: boolean, date?: string) => void;
}

interface BookDelayCompletedID {
  id: string;
  value: boolean;
  date: string | undefined;
}

const DelayCompletedContext = createContext<DelayCompleted | undefined>(undefined);

export const useDelayCompletedContext = () => {
  return useContext(DelayCompletedContext);
};

export const DelayCompletedProvider = ({ children }: { children: any }) => {
  const bookDelayCompletedIDRef = useRef<BookDelayCompletedID[]>([]);
  const localUpdateData = useLocalUpdateMemoMulti();
  const setTimer = useSetTimeout();

  const updateLocalCompleted = (id: string, value: boolean, date?: string) => {
    bookDelayCompletedIDRef.current.push({ id: id, value: value, date: date });

    // 時間差で更新
    setTimer(updateLocalCompletedCallback, 2000);
  };

  const updateLocalCompletedCallback = () => {
    let setData: LocalUpdateMemoProps[] = [];
    for (let i = 0; i < bookDelayCompletedIDRef.current.length; i++) {
      const { id, value, date } = bookDelayCompletedIDRef.current[i];

      let tmpData: ChangeableMemo = {};
      tmpData.completed = value;
      if (value) {
        tmpData.completedAt = date;
      }

      setData.push({ memoId: id, data: tmpData });
    }
    localUpdateData(setData);

    bookDelayCompletedIDRef.current = [];
  };

  const value = {
    updateLocalCompleted: updateLocalCompleted,
  };

  return <DelayCompletedContext.Provider value={value}>{children}</DelayCompletedContext.Provider>;
};
