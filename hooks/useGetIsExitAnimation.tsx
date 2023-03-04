import { useEffect, useState } from 'react';

import { useRecoilValue, useRecoilState } from 'recoil';

import { changeMemoState } from '../states/changeMemoState';
import { isLogginginState } from '../states/isLogginginState';
import { isLoggingoutState } from '../states/isLoggingoutState';
import { openSideDrawerState } from '../states/openSideDrawerState';
import { openUserMenuState } from '../states/openUserMenuState';

export const useGetIsExitAnimation = () => {
  // 画面切り替えの時は、CollapseコンポーネントのExitアニメーションを無効にする
  const openSideDrawer = useRecoilValue(openSideDrawerState);
  const [_openSideDrawer, _setOpenSideDrawer] = useState(false);
  const openUserMenu = useRecoilValue(openUserMenuState);
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
    _setOpenSideDrawer(openSideDrawer);
  }, [openSideDrawer]);

  return !_openSideDrawer && !openUserMenu && !isLoggingout && !isLoggingin;
};
