import { useMemo } from 'react';

import { useRecoilValue, useRecoilState } from 'recoil';

import { useSettingInfoContext } from '../components/SettingInfoContext';
import { changeMemoState } from '../states/changeMemoState';
import { memoFilterAllHideCompletedState } from '../states/memoFilterAllHideCompletedState';
import { memoFilterAllState } from '../states/memoFilterAllState';
import { memoFilterCompletedState } from '../states/memoFilterCompletedState';
import { memoFilterTrashState } from '../states/memoFilterTrashState';
import { selectedDisplayTypeState } from '../states/selectedDisplayTypeState';

export const useGetNowAllTabData = () => {
  const selectedDisplayType = useRecoilValue(selectedDisplayTypeState);
  const settingInfo = useSettingInfoContext();
  const setting = settingInfo?.setting;

  const changeMemo = useRecoilValue(changeMemoState);

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

  const nowAllTabData = useMemo(
    () => memo,
    // オリジナルデータ（memo）は依存関係に含めない
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [changeMemo, selectedDisplayType.id, setting?.hide_completed_memo],
  );

  return nowAllTabData;
};
