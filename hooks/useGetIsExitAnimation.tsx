import { useEffect, useState } from 'react';

import { useRecoilValue, useRecoilState } from 'recoil';

import { changeMemoState } from '../states/changeMemoState';
import { isLogginginState } from '../states/isLogginginState';
import { isLoggingoutState } from '../states/isLoggingoutState';
import { openMenuDelayState } from '../states/openMenuDelayState';

export const useGetIsExitAnimation = () => {
  // 画面切り替えの時は、CollapseコンポーネントのExitアニメーションを無効にする
  const openMenuDelay = useRecoilValue(openMenuDelayState);
  const [openMenu, setOpenMenu] = useState(false);
  const [isLoggingout, setIsLoggingout] = useRecoilState(isLoggingoutState);
  const [isLoggingin, setIsLoggingin] = useRecoilState(isLogginginState);

  const changeMemo = useRecoilValue(changeMemoState);

  useEffect(() => {
    setIsLoggingout(false);
    setIsLoggingin(false);
  }, [changeMemo, setIsLoggingout, setIsLoggingin]);

  useEffect(() => {
    // openSideDrawerをfalseにするのをTimelineコンポーネントレンダリング後にするため
    // これがないと、useScrollManagerのinitializeClientHeightで正しい高さが取得できない
    setOpenMenu(openMenuDelay);
  }, [openMenuDelay]);

  return !openMenu && !isLoggingout && !isLoggingin;
};
