import { atom } from 'recoil';
import { User } from 'firebase/auth';

export const authUserState = atom<User | undefined>({
  key: 'authUserState',
  default: undefined,
  dangerouslyAllowMutability: true,
});
