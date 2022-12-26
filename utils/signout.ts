import { app } from '../utils/firebase';
import { getAuth, signOut } from 'firebase/auth';

export const signout = async () => {
  const auth = getAuth(app);
  await signOut(auth);
};
