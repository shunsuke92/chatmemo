import { useState, useEffect } from 'react';

import { useSetRecoilState } from 'recoil';

import LinearProgress from '@mui/material/LinearProgress';

import { getAuth, onAuthStateChanged } from 'firebase/auth';

import axios from 'axios';

import { useInitializationProcess } from '../hooks/useInitializationProcess';
import { authUserState } from '../states/authUserState';
import { app } from '../utils/firebase';

export const Auth = ({ children }: { children: any }) => {
  const setUser = useSetRecoilState(authUserState);

  const initializationProcess = useInitializationProcess();

  const [isAuthChecking, setIsAuthChecking] = useState(true);

  useEffect(() => {
    const auth = getAuth(app);
    const unsubscribed = onAuthStateChanged(auth, (user) => {
      if (user) {
        // サインインしている
        setUser(user);

        (async () => {
          // ユーザー登録済みチェック
          const res = await axios.get(`/api/users/${user.uid}`);

          // ユーザー登録（新規ユーザーの場合）
          if (!res.data) {
            const res = await axios.post(`/api/users/${user.uid}`);
          }

          setIsAuthChecking(false);
        })();
      } else {
        // サインアウトしている
        setUser(undefined);
        initializationProcess();
        setIsAuthChecking(false);
      }
    });

    return () => {
      unsubscribed();
    };
  }, [setUser, initializationProcess]);

  return <>{isAuthChecking ? <LinearProgress /> : children}</>;
};
