import { atom } from 'recoil';

import { useCreateStringID } from '../hooks/useCreateStringID';

type CreateErrIDStateProps = () => string;

export const createErrIDState = atom<CreateErrIDStateProps>({
  key: 'createErrIDState',
  default: () => {
    return '';
  },
  effects: [
    ({ setSelf }) => {
      const createErrID = useCreateStringID('E');
      setSelf(() => createErrID);
    },
  ],
});
