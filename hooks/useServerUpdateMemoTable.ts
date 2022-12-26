import { useRecoilValue } from 'recoil';
import { authUserState } from '../states/authUserState';
import axios from 'axios';
import { useManageTentativeIDContext } from '../components/ManageTentativeIDContext';

interface SendMemo {
  body?: string;
  createdAt?: string;
  updatedAt?: string;
  completed?: boolean;
  completedAt?: string;
  deleted?: boolean;
  deletedAt?: string;
}

export const useServerUpdateMemoTable = () => {
  const user = useRecoilValue(authUserState);

  const manageID = useManageTentativeIDContext();

  const serverUpdateMemoTable = async (id: string, specifiedData: SendMemo): Promise<boolean> => {
    const sendID = manageID?.getConfirmedID(id) ?? id;

    let response = false;
    if (user) {
      await axios
        .patch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/v1/users/${user.uid}/memos/${sendID}`,
          specifiedData,
        )
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

  return serverUpdateMemoTable;
};
