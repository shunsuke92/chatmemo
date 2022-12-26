import { atom } from 'recoil';

export interface DisplayType {
  id: number;
  name: string;
}

export const DISPLAY_TYPE: DisplayType[] = [
  { id: 1, name: 'すべてのメモ' },
  { id: 2, name: '実行済み' },
  { id: 3, name: 'ごみ箱' },
];

export const selectedDisplayTypeState = atom<DisplayType>({
  key: 'selectedDisplayTypeState',
  default: DISPLAY_TYPE[0],
});
