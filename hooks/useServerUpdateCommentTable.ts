import { useRecoilValue } from 'recoil';
import { authUserState } from '../states/authUserState';
import axios from 'axios';
import { useManageTentativeIDContext } from '../components/ManageTentativeIDContext';

interface SendComment {
  body?: string;
  createdAt?: string;
  updatedAt?: string;
  deleted?: boolean;
  deletedAt?: string;
}

export const useServerUpdateCommentTable = () => {
  const user = useRecoilValue(authUserState);

  const manageID = useManageTentativeIDContext();

  const serverUpdateCommentTable = async (
    memoID: string,
    commentID: string,
    specifiedData: SendComment,
  ): Promise<boolean> => {
    const sendMemoID = manageID?.getConfirmedID(memoID) ?? memoID;
    const sendCommentID = manageID?.getConfirmedID(commentID) ?? commentID;

    let response = false;
    if (user) {
      await axios
        .patch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/v1/users/${user.uid}/memos/${sendMemoID}/comments/${sendCommentID}`,
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

  return serverUpdateCommentTable;
};
