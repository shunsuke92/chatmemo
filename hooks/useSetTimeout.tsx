import { useRef } from 'react';

export const useSetTimeout = () => {
  const timeoutID = useRef<NodeJS.Timeout | undefined>(undefined);

  const setTimer = (callback: any, delay: number) => {
    // 設定済みのタイマーがあればクリア
    if (timeoutID !== undefined) {
      clearTimeout(timeoutID.current);
    }

    // タイマーセット
    const ID = setTimeout(() => {
      // コールバック実行
      callback();

      // タイマーID初期化
      timeoutID.current = undefined;
    }, delay);

    // タイマーID保存
    timeoutID.current = ID;
  };

  return setTimer;
};
