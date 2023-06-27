import { Memo } from '../states/memoState';
import { getDate } from './getDate';
import { getNowDate } from './getNowDate';
import { getTime } from './getTime';

const nowDate = getNowDate();
const date = getDate(nowDate);
const time = getTime(nowDate);

export const demoData: Memo[] = [
  {
    id: 1,
    body: 'ようこそ、チャットメモへ ^ ^',
    _text: ['ようこそ、チャットメモへ ^ ^'],
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
    body: '※ ログインすると、メモが保存できます。',
    _text: ['※ ログインすると、メモが保存できます。'],
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
    comments: [],
  },
];
