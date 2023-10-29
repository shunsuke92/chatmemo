import { getDate } from './getDate';
import { getNowDate } from './getNowDate';
import { getTime } from './getTime';
import { Memo } from '../types/index';

const nowDate = getNowDate();
const date = getDate(nowDate);
const time = getTime(nowDate);

export const demoData: Memo[] = [
  {
    id: 1,
    body: 'ようこそ、ゲストさん 🥳🥳🎉',
    _text: ['ようこそ、ゲストさん 🥳🥳🎉'],
    completed: false,
    deleted: false,
    createdAt: nowDate,
    updatedAt: nowDate,
    completedAt: nowDate,
    deletedAt: nowDate,
    _date: date,
    _time: time,
    _synchronized: true,
    _tmpCompleted: false,
    _tmpCompletedAt: nowDate,
    _type: 'memo',
    _id: '1',
    comments: [],
  },
  {
    id: 2,
    body: 'これはチャットのようなメモアプリ',
    _text: ['これはチャットのようなメモアプリ'],
    completed: false,
    deleted: false,
    createdAt: nowDate,
    updatedAt: nowDate,
    completedAt: nowDate,
    deletedAt: nowDate,
    _date: date,
    _time: time,
    _synchronized: true,
    _tmpCompleted: false,
    _tmpCompletedAt: nowDate,
    _type: 'memo',
    _id: '2',
    comments: [
      {
        id: 1,
        body: 'ログインすると、メモが保存できるようになります',
        _text: ['ログインすると、メモが保存できるようになります'],
        deleted: false,
        createdAt: nowDate,
        updatedAt: nowDate,
        deletedAt: nowDate,
        _date: date,
        _time: time,
        _synchronized: true,
        _type: 'comment',
        _id: '1',
        _memoId: '2',
      },
    ],
  },
];
