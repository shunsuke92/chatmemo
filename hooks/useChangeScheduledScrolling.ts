import { useSetRecoilState } from 'recoil';
import { scheduledScrollingState } from '../states/scheduledScrollingState';

export const useChangeScheduledScrolling = () => {
  const setScheduledScrolling = useSetRecoilState(scheduledScrollingState);

  function changeScheduledScrolling(value: boolean) {
    setScheduledScrolling(value);

    // 使用後は常時オフになるようにする
    if (value) {
      setTimeout(() => {
        setScheduledScrolling(false);
      }, 100);
    }
  }

  return changeScheduledScrolling;
};
