import { useState, useEffect } from 'react';

import { useSetRecoilState } from 'recoil';

import { getAuth, onAuthStateChanged } from 'firebase/auth';

import axios from 'axios';

import { authUserState } from '../states/authUserState';
import { initialLoadingState } from '../states/initialLoadingState';
import { app } from '../utils/firebase';

export const Auth = ({ children }: { children: any }) => {
  const setUser = useSetRecoilState(authUserState);
  const setinitialLoading = useSetRecoilState(initialLoadingState);

  const [isAuthChecking, setIsAuthChecking] = useState(true);

  useEffect(() => {
    const auth = getAuth(app);
    const unsubscribed = onAuthStateChanged(auth, (user) => {
      if (user) {
        // サインインしている
        setUser(user);
        setinitialLoading(1);

        (async () => {
          // ユーザー登録済みチェック
          const res = await axios.get(
            `${process.env.NEXT_PUBLIC_API_URL}/api/v1/users/${user.uid}/`,
          );
          // API Routes バージョン
          /* const res = await axios.get(`/api/users/${user.uid}`); */

          // ユーザー登録（新規ユーザーの場合）
          if (!res.data) {
            const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/users/`, {
              uid: user.uid,
            });
            // API Routes バージョン
            /* const res = await axios.post(`/api/users/${user.uid}`); */
          }

          setIsAuthChecking(false);
        })();
      } else {
        // サインアウトしている
        setUser(undefined);
        setinitialLoading(1);
        setIsAuthChecking(false);
      }
    });

    return () => {
      unsubscribed();
    };
  }, [setUser, setinitialLoading]);

  return <>{isAuthChecking ? <></> : children}</>;
};
