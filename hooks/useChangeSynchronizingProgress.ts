import { useSetRecoilState } from 'recoil';

import { synchronizingProgressState } from '../states/synchronizingProgressState';

export const useChangeSynchronizingProgress = () => {
  const setSynchronizingProgress = useSetRecoilState(synchronizingProgressState);

  const changeSynchronizingProgress = (value: number) => {
    setSynchronizingProgress(value);
  };

  return changeSynchronizingProgress;
};
