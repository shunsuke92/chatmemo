import { getAuth, signOut } from 'firebase/auth';

import { app } from '../utils/firebase';

export const signout = async () => {
  const auth = getAuth(app);
  await signOut(auth);
};
