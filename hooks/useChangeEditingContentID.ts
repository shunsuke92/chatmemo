import { useSetRecoilState } from 'recoil';
import { editingContentIDState } from '../states/editingContentIDState';

export const useChangeEditingContentID = () => {
  const setEditingContentID = useSetRecoilState(editingContentIDState);

  function changeEditingContentID(id: string) {
    setEditingContentID(id);
  }

  return changeEditingContentID;
};
