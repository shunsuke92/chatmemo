import { useRecoilValue } from 'recoil';
import { authUserState } from '../states/authUserState';
import axios from 'axios';
import { useManageTentativeIDContext } from '../components/ManageTentativeIDContext';

export const useServerDeleteMemoTable = () => {
  const user = useRecoilValue(authUserState);

  const manageID = useManageTentativeIDContext();

  const serverDeleteMemoTable = async (memoID: string): Promise<boolean> => {
    const sendID = manageID?.getConfirmedID(memoID) ?? memoID;

    // サーバーから完全削除
    let response = false;
    if (user) {
      await axios
        .delete(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/users/${user.uid}/memos/${sendID}`)
        .then((res) => {
          response = true;
        })
        .catch((err) => {
          response = false;
        });
    } else {
      response = true;
    }

    return response;
  };

  return serverDeleteMemoTable;
};
