import { atom } from 'recoil';
import { useCreateNumberID } from '../hooks/useCreateNumberID';

type createDemoIDStateProps = () => number;

export const createDemoIDState = atom<createDemoIDStateProps>({
  key: 'createDemoIDState',
  default: () => {
    return 0;
  },
  effects: [
    ({ setSelf }) => {
      const createErrID = useCreateNumberID(1000);
      setSelf(() => createErrID);
    },
  ],
});
