import { useSetRecoilState } from 'recoil';

import { scheduledScrollingState } from '../states/scheduledScrollingState';

// 未使用
// カスタムフックだと呼び出し元に再レンダリングが発生するタイミングでカスタムフックも再呼び出しされる。
// その際に新しい関数として生成されるため、useEffectの依存配列にその関数を含めていると、変更があったと判定され、
// 無駄にuseEffect内の処理が発生する。
// Recoilのセット関数を直接使う場合は、問題なし。
export const useChangeScheduledScrolling = () => {
  const setScheduledScrolling = useSetRecoilState(scheduledScrollingState);

  const changeScheduledScrolling = (value: boolean) => {
    setScheduledScrolling(value);

    // 使用後は常時オフになるようにする
    if (value) {
      setTimeout(() => {
        setScheduledScrolling(false);
      }, 100);
    }
  };

  return changeScheduledScrolling;
};
