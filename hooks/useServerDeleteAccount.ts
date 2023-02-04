import { useRecoilValue } from 'recoil';

import axios from 'axios';

import { authUserState } from '../states/authUserState';

export const useServerDeleteAccount = () => {
  const user = useRecoilValue(authUserState);

  const deleteAccount = async (): Promise<boolean> => {
    let result = false;
    if (user) {
      await axios
        .delete(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/users/${user.uid}`)
        // API Routes バージョン
        /* .delete(`/api/users/${user.uid}`) */
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
