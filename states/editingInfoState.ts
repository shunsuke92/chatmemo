import { atom } from 'recoil';

import { EditingInfo } from '../types/index';

export const editingInfoState = atom<EditingInfo | undefined>({
  key: 'editingInfoState',
  default: undefined,
});
