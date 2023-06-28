import { useRecoilValue } from 'recoil';

import axios from 'axios';

import { useCreateDemoID } from './useCreateDemoID';
import { authUserState } from '../states/authUserState';
import { Memo } from '../states/memoState';
import { convertSendMemo } from '../utils/convertSendMemo';

export const useServerCreateMemoTable = () => {
  const user = useRecoilValue(authUserState);
  const createDemoID = useCreateDemoID();

  const serverCreateMemoTable = async (memo: Memo): Promise<number> => {
    let response = -1;
    if (user) {
      await axios
        .post(
          `${process.env.NEXT_PUBLIC_API_URL}/api/v1/users/${user.uid}/memos`,
          convertSendMemo(memo),
        )
        // API Routes バージョン
        /* .post(`/api/users/${user.uid}/memos`, convertSendMemo(memo)) */
        .then((res) => {
          if (res.data.status === 200) {
            const serverRegisteredID = res.data.data.id;
            response = serverRegisteredID;
          }
        })
        .catch((err) => {});
    } else {
      response = createDemoID();
    }

    return response;
  };

  return serverCreateMemoTable;
};
