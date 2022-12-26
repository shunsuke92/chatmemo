import { atom } from 'recoil';

export const isLoggingoutState = atom<boolean>({
  key: 'isLoggingoutState',
  default: false,
});
