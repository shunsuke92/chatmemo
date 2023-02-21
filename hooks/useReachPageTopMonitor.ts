import { useEffect, useCallback, useRef } from 'react';

import { useSetRecoilState, useRecoilValue } from 'recoil';

import { displayStepState } from '../states/displayStepState';
import { isAllDisplayedState } from '../states/isAllDisplayedState';

export const useReachPageTopMonitor = () => {
  const setDisplayStep = useSetRecoilState(displayStepState);
  const isAllDisplayed = useRecoilValue(isAllDisplayedState);

  const timerId = useRef<NodeJS.Timeout | undefined>(undefined);

  const increaseDisplayStep = useCallback(() => {
    if (!isAllDisplayed && window.scrollY < 1) {
      setDisplayStep((prevState) => prevState + 1);
    }
  }, [isAllDisplayed, setDisplayStep]);

  const handleScroll = useCallback(() => {
    // 慣性スクロール対策で0.1秒間スクロールされない場合に処理を実行する
    clearTimeout(timerId.current);
    timerId.current = setTimeout(() => {
      increaseDisplayStep();
    }, 100);
  }, [increaseDisplayStep]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [handleScroll]);
};
