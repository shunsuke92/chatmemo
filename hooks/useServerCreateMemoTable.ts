import { Memo } from '../states/memoState';
import { useRecoilValue } from 'recoil';
import { authUserState } from '../states/authUserState';
import axios from 'axios';
import { convertSendMemo } from '../utils/convertSendMemo';
import { createDemoIDState } from '../states/createDemoIDState';

export const useServerCreateMemoTable = () => {
  const user = useRecoilValue(authUserState);
  const createDemoID = useRecoilValue(createDemoIDState);

  const serverCreateMemoTable = async (memo: Memo): Promise<number> => {
    let response = -1;
    if (user) {
      await axios
        .post(
          `${process.env.NEXT_PUBLIC_API_URL}/api/v1/users/${user.uid}/memos`,
          convertSendMemo(memo),
        )
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
