import { createContext, useState, useContext, useEffect } from 'react';
import { app } from '../utils/firebase';
import { getAuth, onAuthStateChanged, User, signOut } from 'firebase/auth';
import LinearProgress from '@mui/material/LinearProgress';
import axios from 'axios';

interface UserInfo {
  user: User | null;
  signout: () => void;
}

const AuthContext = createContext<UserInfo | null>(null);

export function useAuthContext() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }: { children: any }) {
  const [user, setUser] = useState<User | null>(null);
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
        setUser(null);
        setIsAuthChecking(false);
      }
    });

    return () => {
      unsubscribed();
    };
  }, []);

  const signout = async () => {
    const auth = getAuth(app);
    await signOut(auth);
  };

  const userInfo: UserInfo = {
    user: user,
    signout: signout,
  };

  return (
    <AuthContext.Provider value={userInfo}>
      {isAuthChecking ? <LinearProgress /> : children}
    </AuthContext.Provider>
  );
}
