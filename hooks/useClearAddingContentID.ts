import { useSetRecoilState } from 'recoil';
import { addingContentIDState } from '../states/addingContentIDState';

export const useClearAddingContentID = () => {
  const setAddingContentID = useSetRecoilState(addingContentIDState);

  function clearAddingContentID() {
    setAddingContentID('');
  }

  return clearAddingContentID;
};
