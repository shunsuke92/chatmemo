import { useState, useEffect } from 'react';

import { useSetRecoilState, useRecoilValue } from 'recoil';

import axios from 'axios';

import { authUserState } from '../states/authUserState';
import { initialScrollingState } from '../states/initialScrollingState';
import { initialServerAccessedState } from '../states/initialServerAccessedState';
import { memoState } from '../states/memoState';
import { Memo } from '../types/index';
import { demoData } from '../utils/demoData';
import { getDate } from '../utils/getDate';
import { getTime } from '../utils/getTime';

export const DataManager = ({ children }: { children: any }) => {
  const [isGettingData, setIsGettingData] = useState(true);
  const setMemo = useSetRecoilState(memoState);
  const setInitialScrolling = useSetRecoilState(initialScrollingState);
  const setInitialServerAccessed = useSetRecoilState(initialServerAccessedState);

  const user = useRecoilValue(authUserState);

  useEffect(() => {
    // サーバーのデータを取得する
    (async () => {
      let serverData: Memo[] = [];

      if (user) {
        await axios
          .get(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/users/${user.uid}/memos`, {
            // API Routes バージョン
            /* .get(`/api/users/${user.uid}/memos`, { */
            // 未使用
            params: { limit: 100, offset: 0 },
          })
          .then((res) => {
            serverData = res.data.contents;

            // ローカルデータを追加
            const clientData: Memo[] = serverData.map((memo) => {
              memo._text = memo.body.split(/\r\n|\n|\r/gm);
              memo._date = getDate(memo.createdAt);
              memo._time = getTime(memo.createdAt);
              memo._synchronized = true;
              memo._tmpCompleted = memo.completed;
              memo._tmpCompletedAt = memo.completedAt;
              memo._type = 'memo';
              memo._id = memo.id.toString();

              memo.comments.map((comment) => {
                comment._text = comment.body.split(/\r\n|\n|\r/gm);
                comment._date = getDate(comment.createdAt);
                comment._time = getTime(comment.createdAt);
                comment._synchronized = true;
                comment._type = 'comment';
                comment._id = comment.id.toString();
                comment._memoId = memo.id.toString();
              });

              return memo;
            });

            setMemo(clientData);
            setInitialScrolling(true);
            setInitialServerAccessed((prevState) => prevState + 1);
            setIsGettingData(false);
          })
          .catch((err) => {});
      } else {
        setMemo(demoData);
        setInitialScrolling(true);
        setInitialServerAccessed((prevState) => prevState + 1);
        setIsGettingData(false);
      }
    })();
    // userは依存関係に入れない
    // データを取得するのは初回読み込みのときだけ、ログイン、ログアウト時はリロードする
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setMemo, setInitialScrolling, setInitialServerAccessed]);

  return <>{isGettingData ? <></> : <main>{children}</main>}</>;
};
