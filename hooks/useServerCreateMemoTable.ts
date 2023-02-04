import { useRecoilValue } from 'recoil';

import axios from 'axios';

import { authUserState } from '../states/authUserState';
import { Memo } from '../states/memoState';
import { convertSendMemo } from '../utils/convertSendMemo';
import { useCreateDemoID } from './useCreateDemoID';

export const useServerCreateMemoTable = () => {
  const user = useRecoilValue(authUserState);
  const createDemoID = useCreateDemoID();

  const serverCreateMemoTable = async (memo: Memo): Promise<number> => {
    let response = -1;
    if (user) {
      await axios
        .post(`/api/users/${user.uid}/memos`, convertSendMemo(memo))
        .then((res) => {
          if (res.data.status === 200) {
            const serverRegisteredID = res.data.data.id;
            response = serverRegisteredID;
          } else {
            console.log('200以外', res);
          }
        })
        .catch((err) => {
          console.log('エラー', err);
        });
    } else {
      response = createDemoID();
    }

    return response;
  };

  return serverCreateMemoTable;
};
