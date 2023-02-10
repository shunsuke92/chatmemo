import { useEffect, useCallback, useRef } from 'react';

import { useSetRecoilState } from 'recoil';

import { displayStepState } from '../states/displayStepState';

export const useIncreaseDisplayContent = (displayedAll: boolean) => {
  const setDisplayStep = useSetRecoilState(displayStepState);

  const timerId = useRef<NodeJS.Timeout | undefined>(undefined);

  const scrollCount = useCallback(() => {
    // 慣性スクロール対策で0.1秒間スクロールされない場合に処理を実行する
    clearTimeout(timerId.current);
    timerId.current = setTimeout(() => {
      if (!displayedAll && window.scrollY < 1) {
        setDisplayStep((prevState) => prevState + 1);
      }
    }, 100);
  }, [displayedAll, setDisplayStep]);

  useEffect(() => {
    window.addEventListener('scroll', scrollCount);

    return () => {
      window.removeEventListener('scroll', scrollCount);
    };
  }, [scrollCount]);

  return scrollCount;
};
