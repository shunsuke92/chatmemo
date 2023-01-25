import { useEffect, useCallback } from 'react';

import { useSetRecoilState } from 'recoil';

import { displayStepState } from '../states/displayStepState';

export const useIncreaseDisplayContent = (displayedAll: boolean) => {
  const setDisplayStep = useSetRecoilState(displayStepState);

  const scrollCount = useCallback(() => {
    if (!displayedAll && window.scrollY < 100) {
      setDisplayStep((prevState) => prevState + 1);
    }

    // 瞬時に画面上部まで遷移した場合（スクロールバーを掴んで素早く最上部までスライドさせた場合）に
    // 次のメモが読み込まれなくなる事象の対応
    if (!displayedAll && window.scrollY === 0) {
      setTimeout(() => {
        window.scroll(0, 1);
      }, 10);
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
