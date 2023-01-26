import { useRecoilState } from 'recoil';

import { demoIDState } from '../states/demoIDState';

export const useCreateDemoID = () => {
  const [demoID, setDemoID] = useRecoilState(demoIDState);

  const createID = () => {
    setDemoID((prevState) => prevState + 1);
    return demoID;
  };

  return createID;
};
