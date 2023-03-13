import { useEffect } from 'react';

import { useSetRecoilState } from 'recoil';

import { isMobileState } from '../states/isMobileState';

export const useSetIsMobile = () => {
  const setIsMobile = useSetRecoilState(isMobileState);

  const isMobile = window.ontouchstart !== undefined && 0 < navigator.maxTouchPoints;

  useEffect(() => {
    setIsMobile(isMobile);
  });
};
