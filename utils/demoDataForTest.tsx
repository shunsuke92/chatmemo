import { Memo } from '../states/memoState';
import { getDate } from './getDate';
import { getNowDate } from './getNowDate';
import { getTime } from './getTime';

const nowDate = getNowDate();
const date = getDate(nowDate);
const time = getTime(nowDate);

const ITEM_NUM = 500;

const base: Memo = {
  id: 0,
  body: 'テスト0',
  _text: ['テスト0'],
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
  _id: '0',
  comments: [],
};

export let demoDataForTest: Memo[] = [];

for (let i = 1; i <= ITEM_NUM; i++) {
  demoDataForTest.push({
    ...base,
    id: i,
    body: `テスト${i}`,
    _text: [`テスト${i}`],
    _id: String(i),
  });
}
