import { useSetRecoilState } from 'recoil';

import { editingContentIDState } from '../states/editingContentIDState';

export const useClearEditingContentID = () => {
  const setEditingContentID = useSetRecoilState(editingContentIDState);

  const clearEditingContentID = () => {
    setEditingContentID('');
  };

  return clearEditingContentID;
};
