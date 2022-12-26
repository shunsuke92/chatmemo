import { useSetRecoilState } from 'recoil';
import { displayStepState } from '../states/displayStepState';
import { useEffect, useCallback } from 'react';

export const useIncreaseDisplayContent = (displayedAll: boolean) => {
  const setDisplayStep = useSetRecoilState(displayStepState);

  const scrollCount = useCallback(() => {
    if (!displayedAll && window.scrollY < 1000) {
      setDisplayStep((prevState) => prevState + 1);
    }
  }, [displayedAll, setDisplayStep]);

  useEffect(() => {
    window.addEventListener('scroll', scrollCount);

    return () => {
      window.removeEventListener('scroll', scrollCount);
    };
  }, [scrollCount]);

  return scrollCount;
};
