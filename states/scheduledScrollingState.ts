import { atom } from 'recoil';

export const scheduledScrollingState = atom<boolean>({
  key: 'scheduledScrollingState',
  default: false,
});
