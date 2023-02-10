import { useEffect } from 'react';

import { useRecoilValue, useSetRecoilState } from 'recoil';

import { useSettingInfoContext } from '../components/SettingInfoContext';
import { useAddDateForDisplay } from '../hooks/useAddDateForDisplay';
import { useIncreaseDisplayContent } from '../hooks/useIncreaseDisplayContent';
import { isLoadingState } from '../states/isLoadingState';
import { memoFilterAllHideCompletedState } from '../states/memoFilterAllHideCompletedState';
import { memoFilterAllState } from '../states/memoFilterAllState';
import { memoFilterCompletedState } from '../states/memoFilterCompletedState';
import { memoFilterTrashState } from '../states/memoFilterTrashState';
import { selectedDisplayTypeState } from '../states/selectedDisplayTypeState';

export const useCreateDisplayData = () => {
  const selectedDisplayType = useRecoilValue(selectedDisplayTypeState);
  const settingInfo = useSettingInfoContext();
  const setting = settingInfo?.setting;
  const addDateForDisplay = useAddDateForDisplay();
  const setIsLoading = useSetRecoilState(isLoadingState);

  useEffect(() => {
    // 最後まで表示したらローディング表示を止める
    if (displayedAll) {
      setIsLoading(false);
    }
  });

  let state;
  if (selectedDisplayType.id === 1 && !setting?.hide_completed_memo) {
    // すべてのメモ + 実行済み表示
    state = memoFilterAllState;
  } else if (selectedDisplayType.id === 1 && setting?.hide_completed_memo) {
    // すべてのメモ + 実行済み非表示
    state = memoFilterAllHideCompletedState;
  } else if (selectedDisplayType.id === 2) {
    // 実行済み
    state = memoFilterCompletedState;
  } else if (selectedDisplayType.id === 3) {
    // ごみ箱
    state = memoFilterTrashState;
  } else {
    // 例外
    state = memoFilterAllState;
  }

  const memo = useRecoilValue(state);
  const { data, displayedAll } = addDateForDisplay(memo);
  useIncreaseDisplayContent(displayedAll);

  return data;
};
