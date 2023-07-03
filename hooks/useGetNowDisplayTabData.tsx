import { useRecoilValue } from 'recoil';

import { useSettingInfoContext } from '../components/SettingInfoContext';
import { displayingMemoFilterAllHideCompletedState } from '../states/displayingMemoFilterAllHideCompletedState';
import { displayingMemoFilterAllState } from '../states/displayingMemoFilterAllState';
import { displayingMemoFilterCompletedState } from '../states/displayingMemoFilterCompletedState';
import { displayingMemoFilterTrashState } from '../states/displayingMemoFilterTrashState';
import { selectedDisplayTypeState } from '../states/selectedDisplayTypeState';
import { addDateForDisplay } from '../utils/addDateForDisplay';

export const useGetNowDisplayTabData = () => {
  const selectedDisplayType = useRecoilValue(selectedDisplayTypeState);
  const settingInfo = useSettingInfoContext();
  const setting = settingInfo?.setting;

  let state;
  if (selectedDisplayType.id === 1 && !setting?.hide_completed_memo) {
    // すべてのメモ + 実行済み表示
    state = displayingMemoFilterAllState;
  } else if (selectedDisplayType.id === 1 && setting?.hide_completed_memo) {
    // すべてのメモ + 実行済み非表示
    state = displayingMemoFilterAllHideCompletedState;
  } else if (selectedDisplayType.id === 2) {
    // 実行済み
    state = displayingMemoFilterCompletedState;
  } else if (selectedDisplayType.id === 3) {
    // ごみ箱
    state = displayingMemoFilterTrashState;
  } else {
    // 例外
    state = displayingMemoFilterAllState;
  }

  const memo = useRecoilValue(state);

  return addDateForDisplay(memo);
};
