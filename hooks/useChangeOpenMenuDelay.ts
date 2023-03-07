import { useSetRecoilState } from 'recoil';

import { openMenuDelayState } from '../states/openMenuDelayState';

export const useChangeOpenMenuDelay = () => {
  const setOpenMenuDelay = useSetRecoilState(openMenuDelayState);

  const changeOpenMenuDelay = (value: boolean) => {
    setTimeout(() => {
      setOpenMenuDelay(value);
    }, 250);
  };

  return changeOpenMenuDelay;
};
