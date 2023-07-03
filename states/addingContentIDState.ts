import { atom } from 'recoil';

export const addingContentIDState = atom<string | undefined>({
  key: 'addingContentIDState',
  default: undefined,
});
