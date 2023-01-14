import { useSetRecoilState } from 'recoil';

import { selectedDisplayTypeState, DisplayType } from '../states/selectedDisplayTypeState';

export const useChangeSelectedDisplayType = () => {
  const setSelectedDisplayType = useSetRecoilState(selectedDisplayTypeState);

  const changeSelectedDisplayType = (data: DisplayType) => {
    setSelectedDisplayType(data);
  };

  return changeSelectedDisplayType;
};
