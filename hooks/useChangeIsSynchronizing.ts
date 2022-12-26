import { useSetRecoilState } from 'recoil';
import { isSynchronizingState } from '../states/isSynchronizingState';

export const useChangeIsSynchronizing = () => {
  const setIsSynchronizing = useSetRecoilState(isSynchronizingState);

  function changeIsSynchronizing(value: boolean) {
    setIsSynchronizing(value);
  }

  return changeIsSynchronizing;
};
