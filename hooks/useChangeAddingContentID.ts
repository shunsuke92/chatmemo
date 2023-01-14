import { useSetRecoilState } from 'recoil';

import { addingContentIDState } from '../states/addingContentIDState';

export const useChangeAddingContentID = () => {
  const setAddingContentID = useSetRecoilState(addingContentIDState);

  const changeAddingContentID = (id: string) => {
    setAddingContentID(id);
  };

  return changeAddingContentID;
};
