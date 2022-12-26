import { useState, useEffect } from 'react';
import { app } from '../utils/firebase';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import LinearProgress from '@mui/material/LinearProgress';
import axios from 'axios';
import { useSetRecoilState } from 'recoil';
import { authUserState } from '../states/authUserState';
import { useInitializationProcess } from '../hooks/useInitializationProcess';

export function Auth({ children }: { children: any }) {
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
          const res = await axios.get(
            `${process.env.NEXT_PUBLIC_API_URL}/api/v1/users/${user.uid}/`,
          );

          // ユーザー登録（新規ユーザーの場合）
          if (!res.data) {
            const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/users/`, {
              uid: user.uid,
            });
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
}
