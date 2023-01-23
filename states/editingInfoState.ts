import { atom } from 'recoil';

import { EditingInfo } from '../types/common';

export const editingInfoState = atom<EditingInfo | undefined>({
  key: 'editingInfoState',
  default: undefined,
});
