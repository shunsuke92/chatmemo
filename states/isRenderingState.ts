import { atom } from 'recoil';

export const isRenderingState = atom<boolean>({
  key: 'isRenderingState',
  default: true,
});
