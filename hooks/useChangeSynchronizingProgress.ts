import { useSetRecoilState } from 'recoil';
import { synchronizingProgressState } from '../states/synchronizingProgressState';

export const useChangeSynchronizingProgress = () => {
  const setSynchronizingProgress = useSetRecoilState(synchronizingProgressState);

  function changeSynchronizingProgress(value: number) {
    setSynchronizingProgress(value);
  }

  return changeSynchronizingProgress;
};
