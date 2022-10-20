import { Memo, Comment, useDataContext } from '../components/DataContext';
import { useOperationContext } from '../components/OperationContext';
import { useSettingInfoContext } from '../components/SettingInfoContext';

export const useCreateDisplayData = () => {
  const info = useOperationContext();
  const displayData = useDataContext();
  const settingInfo = useSettingInfoContext();
  const setting = settingInfo?.setting;

  const filterData: Memo[] =
    // すべてのメモ + 実行済み表示
    info?.selectedDisplayType.id === 1 && !setting?.hide_completed_memo
      ? displayData?.data
          .filter((d) => !d.deleted)
          .map((d) => {
            d.comments = d.comments.filter((d) => !d.deleted);
            return d;
          }) ?? []
      : // すべてのメモ + 実行済み非表示
      info?.selectedDisplayType.id === 1 && setting?.hide_completed_memo
      ? displayData?.data
          .filter((d) => !d.deleted && !d.completed)
          .map((d) => {
            d.comments = d.comments.filter((d) => !d.deleted);
            return d;
          }) ?? []
      : // 実行済み
      info?.selectedDisplayType.id === 2
      ? displayData?.data
          .filter((d) => !d.deleted && d.completed)
          .map((d) => {
            d.comments = d.comments.filter((d) => !d.deleted);
            return d;
          }) ?? []
      : // ごみ箱
      info?.selectedDisplayType.id === 3
      ? displayData?.data
          .filter((d) => d.deleted)
          .map((d) => {
            d.comments = d.comments.filter((d) => !d.deleted);
            return d;
          }) ?? []
      : [];

  let addDate: Memo[] = [];
  for (let i = 0; i < filterData.length; i++) {
    const nowMemo = filterData[i];
    const beforeMemo = i === 0 ? undefined : filterData[i - 1];

    // メモ日付表示用のデータを追加
    if (nowMemo._date !== beforeMemo?._date) {
      addDate.push({ ...nowMemo, _type: 'date', id: nowMemo.id + 0.5 });
    }

    let comments: Comment[] = [];
    for (let j = 0; j < filterData[i].comments.length; j++) {
      const nowComment = filterData[i].comments[j];
      const beforeComment = j === 0 ? undefined : filterData[i].comments[j - 1];

      // コメント日付表示用のデータを追加
      if (
        (j === 0 && nowComment._date !== nowMemo._date) ||
        (j !== 0 && nowComment._date !== beforeComment?._date)
      ) {
        comments.push({ ...nowComment, _type: 'date', id: nowComment.id + 0.5 });
      }

      // コメント本文を格納
      comments.push({ ...nowComment, _type: 'comment' });
    }

    // メモ本文を格納
    addDate.push({ ...nowMemo, comments: [...comments], _type: 'memo' });
  }

  return addDate;
};
