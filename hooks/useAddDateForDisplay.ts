import { Memo, Comment } from '../states/memoState';
import { useRecoilValue } from 'recoil';
import { displayStepState } from '../states/displayStepState';

interface AddDateForDisplayRes {
  data: Memo[];
  displayedAll: boolean;
}

export const useAddDateForDisplay = () => {
  const displayStep = useRecoilValue(displayStepState);
  const stepNum = 40;

  const addDateForDisplay = (data: Memo[]): AddDateForDisplayRes => {
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
  };
  return addDateForDisplay;
};
