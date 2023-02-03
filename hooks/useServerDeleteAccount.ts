import { useRecoilValue } from 'recoil';

import axios from 'axios';

import { authUserState } from '../states/authUserState';

export const useServerDeleteAccount = () => {
  const user = useRecoilValue(authUserState);

  const deleteAccount = async (): Promise<boolean> => {
    let result = false;
    if (user) {
      await axios
        .delete(`/api/users/${user.uid}`)
        .then((res) => {
          result = true;
        })
        .catch((err) => {
          result = false;
        });
    }
    return result;
  };

  return deleteAccount;
};
