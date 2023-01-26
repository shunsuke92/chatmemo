import { useRecoilState } from 'recoil';

import { errIDState } from '../states/errIDState';

export const useCreateErrID = () => {
  const [errID, setErrID] = useRecoilState(errIDState);

  const createID = () => {
    setErrID((prevState) => prevState + 1);
    return `E${errID}`;
  };

  return createID;
};
