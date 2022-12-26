import { useSetRecoilState } from 'recoil';
import { Memo, memoState } from '../states/memoState';

export const useLocalCreateMemo = () => {
  const setMemo = useSetRecoilState(memoState);

  const localAddMemo = (memo: Memo) => {
    setMemo((prevState) => [...prevState, memo]);
  };
  return localAddMemo;
};
