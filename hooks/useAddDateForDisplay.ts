import { Memo, Comment } from '../states/memoState';

export const useAddDateForDisplay = () => {
  const addDateForDisplay = (data: Memo[]): Memo[] => {
    let addDate: Memo[] = [];
    let count = 0;

    for (let i = 0; i < data.length; i++) {
      const nowMemo = data[i];
      const beforeMemo = i === 0 ? undefined : data[i - 1];

      let comments: Comment[] = [];
      for (let j = 0; j < nowMemo.comments.length; j++) {
        const nowComment = nowMemo.comments[j];
        const beforeComment = j === 0 ? undefined : nowMemo.comments[j - 1];

        // コメント日付表示用のデータを追加
        if (
          (j === 0 && nowComment._date !== nowMemo._date) ||
          (j !== 0 && nowComment._date !== beforeComment?._date)
        ) {
          comments.push({ ...nowComment, _type: 'date', id: nowComment.id + 0.5 });
        }

        // コメント本文を格納
        comments.push({ ...nowComment, _type: 'comment' });
        count++;
      }

      // メモ日付表示用のデータを追加
      if (nowMemo._date !== beforeMemo?._date) {
        addDate.push({ ...nowMemo, _type: 'date', id: nowMemo.id + 0.5 });
      }
      // メモ本文を格納
      addDate.push({ ...nowMemo, comments: [...comments], _type: 'memo' });
      count++;
    }

    return addDate;
  };

  // stepNumを上回る範囲で同一日付のメモをすべて表示する
  // 問題点：同一日付のメモが大量にあるとstepNumを大きく上回るメモが一度に表示され速度低下を引き起こす。
  /* const addDateForDisplay = (data: Memo[]): AddDateForDisplayRes => {
    let addDate: Memo[] = [];
    let count = 0;
    let breakFlg = false;
    const limit = displayStep * stepNum;

    for (let i = data.length - 1; i >= 0; i--) {
      const nowMemo = data[i];
      const nextMemo = i === 0 ? undefined : data[i - 1];

      let comments: Comment[] = [];
      for (let j = 0; j < nowMemo.comments.length; j++) {
        const nowComment = nowMemo.comments[j];
        const nextComment = j === 0 ? undefined : nowMemo.comments[j - 1];

        // コメント日付表示用のデータを追加
        if (
          (j === 0 && nowComment._date !== nowMemo._date) ||
          (j !== 0 && nowComment._date !== nextComment?._date)
        ) {
          comments.push({ ...nowComment, _type: 'date', id: nowComment.id + 0.5 });
        }

        // コメント本文を格納
        comments.push({ ...nowComment, _type: 'comment' });
        count++;
      }

      // メモ本文を格納
      addDate.push({ ...nowMemo, comments: [...comments], _type: 'memo' });
      count++;

      // メモ日付表示用のデータを追加
      if (nowMemo._date !== nextMemo?._date) {
        addDate.push({ ...nowMemo, _type: 'date', id: nowMemo.id + 0.5 });
        if (count >= limit) {
          breakFlg = true;
          break;
        }
      }
    }

    return { data: addDate.slice().reverse(), displayedAll: !breakFlg };
  }; */

  return addDateForDisplay;
};
