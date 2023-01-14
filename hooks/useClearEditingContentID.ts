import { useSetRecoilState } from 'recoil';

import { editingContentIDState } from '../states/editingContentIDState';

export const useClearEditingContentID = () => {
  const setEditingContentID = useSetRecoilState(editingContentIDState);

  function clearEditingContentID() {
    setEditingContentID('');
  }

  return clearEditingContentID;
};
