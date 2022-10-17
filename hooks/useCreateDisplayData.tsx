import { Memo, useDataContext } from '../components/DataContext';
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

  const finalData = filterData.map((d, index) => {
    if (index === 0) {
      d._isDateDisplay = true;
    } else if (d._date !== filterData[index - 1]._date) {
      d._isDateDisplay = true;
    } else {
      d._isDateDisplay = false;
    }
    d.comments = d.comments.map((c, index) => {
      if (index === 0 && c._date !== d._date) {
        c._isDateDisplay = true;
      } else if (index !== 0 && c._date !== d.comments[index - 1]._date) {
        c._isDateDisplay = true;
      } else {
        c._isDateDisplay = false;
      }
      return c;
    });

    return d;
  });

  return finalData;
};
