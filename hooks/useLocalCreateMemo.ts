import { useSetRecoilState } from 'recoil';

import { displayingMemoState } from '../states/displayingMemoState';
import { Memo, memoState } from '../states/memoState';

export const useLocalCreateMemo = () => {
  const setMemo = useSetRecoilState(memoState);
  const setFilteredMemo = useSetRecoilState(displayingMemoState);

  // 重要：setMemoとsetFilteredMemoには同じ処理を適応すること
  const localAddMemo = (memo: Memo) => {
    // オリジナルデータを更新
    setMemo((prevState) => [...prevState, memo]);

    // 表示中のデータを更新
    setFilteredMemo((prevState) => [...prevState, memo]);
  };
  return localAddMemo;
};
