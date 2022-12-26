import { atom } from 'recoil';

export interface Memo {
  id: number;
  created_at?: string;
  updated_at?: string;
  body: string;
  createdAt: string;
  updatedAt: string;
  completed: boolean;
  completedAt: string;
  deleted: boolean;
  deletedAt: string;
  comments: Comment[];
  user_id?: number;
  _text: string[];
  _date: string;
  _time: string;
  _synchronized: boolean;
  _tmpCompleted: boolean;
  _tmpCompletedAt: string;
  _type: 'memo' | 'date';
  _id: string;
}

export interface Comment {
  id: number;
  created_at?: string;
  updated_at?: string;
  body: string;
  createdAt: string;
  updatedAt: string;
  deleted: boolean;
  deletedAt: string;
  memo_id?: number;
  _text: string[];
  _date: string;
  _time: string;
  _synchronized: boolean;
  _type: 'comment' | 'date';
  _id: string;
  _memoId: string;
}

export const memoState = atom<Memo[]>({
  key: 'memoState',
  default: undefined,
});
