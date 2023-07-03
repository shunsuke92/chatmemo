import { useSetRecoilState } from 'recoil';

import { displayingMemoState } from '../states/displayingMemoState';
import { memoState } from '../states/memoState';
import { Memo } from '../types/index';

export const useLocalCreateMemo = () => {
  const setMemo = useSetRecoilState(memoState);
  const setFilteredMemo = useSetRecoilState(displayingMemoState);

  const localAddMemo = (memo: Memo) => {
    // オリジナルデータを更新
    setMemo((prevState) => [...prevState, memo]);

    // 表示中のデータを更新
    setFilteredMemo((prevState) => [...prevState, memo]);
  };
  return localAddMemo;
};
