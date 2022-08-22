import { createContext, useState, useContext, useEffect } from 'react';
import { app } from '../src/firebase';
import { getAuth, onAuthStateChanged,User } from "firebase/auth";

const AuthContext = createContext<User | null>(null);

export function useAuthContext() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }: { children: any }) {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthChecking, setIsAuthChecking] = useState(true)

  useEffect(() => {
    const auth = getAuth(app);
    const unsubscribed = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in
        setUser(user);
        setIsAuthChecking(false);
      } else {
        // User is signed out
        setUser(null)
        setIsAuthChecking(false);
      }
    });

    return () => {
      unsubscribed();
    };
  }, []);

  return <AuthContext.Provider value={user}>{!isAuthChecking && children}</AuthContext.Provider>;
}