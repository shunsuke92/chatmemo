import { Memo } from '../types/index';

export const splitByDisplayStep = (data: Memo[]): Memo[][] => {
  let resData: Memo[][] = [];
  let tmpData: Memo[] = [];
  let count = 0;

  const limit = 20;

  for (let i = data.length - 1; i >= 0; i--) {
    const nowMemo = data[i];
    const nowComment = nowMemo.comments;

    tmpData.push(nowMemo);

    count += 1 + nowComment.length;

    if (count >= limit || i === 0) {
      resData.push(tmpData.slice().reverse());
      tmpData = [];
      count = 0;
    }
  }

  return resData;
};
