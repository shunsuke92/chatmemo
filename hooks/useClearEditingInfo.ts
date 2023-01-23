import { useSetRecoilState } from 'recoil';

import { editingInfoState } from '../states/editingInfoState';

export const useClearEditingInfo = () => {
  const setEditingInfo = useSetRecoilState(editingInfoState);

  const clearEditingInfo = () => {
    setEditingInfo(undefined);
  };

  return clearEditingInfo;
};
