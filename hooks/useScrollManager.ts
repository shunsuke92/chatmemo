import { useState, useEffect, useRef } from 'react';

import { useRecoilValue, useRecoilState } from 'recoil';

import { useReachPageTopMonitor } from '../hooks/useReachPageTopMonitor';
import { authUserState } from '../states/authUserState';
import { changeDisplayStepState } from '../states/changeDisplayStepState';
import { initialScrollingState } from '../states/initialScrollingState';
import { Memo } from '../states/memoState';
import { resetDisplayPositionState } from '../states/resetDisplayPositionState';
import { scheduledScrollingState } from '../states/scheduledScrollingState';
import { scrollingIDState } from '../states/scrollingIDState';

export const useScrollManager = (displayData: Memo[]) => {
  const user = useRecoilValue(authUserState);
  const [scheduledScrolling, setScheduledScrolling] = useRecoilState(scheduledScrollingState);
  const [resetDisplayPosition, setResetDisplayPosition] = useRecoilState(resetDisplayPositionState);
  const [scrollingID, setScrollingIDState] = useRecoilState(scrollingIDState);
  const [initialScrolling, setInitialScrolling] = useRecoilState(initialScrollingState);
  const [changeDisplayStep, setChangeDisplayStep] = useRecoilState(changeDisplayStepState);

  useReachPageTopMonitor();

  const clientHeight = useRef<number[]>([]);
  useEffect(() => {
    // 初回のスクロール
    if (initialScrolling) {
      if (user) {
        scrollToBottom();
      } else {
        scrollToTop();
      }
      setInitialScrolling(false);
    }
  }, [user, initialScrolling, setInitialScrolling]);

  useEffect(() => {
    // 新規メモ作成時のスクロール
    if (scheduledScrolling) {
      scrollToBottom('smooth');
      setScheduledScrolling(false);
    }
  }, [scheduledScrolling, setScheduledScrolling]);

  useEffect(() => {
    // ページ切り替え時のスクロール
    if (resetDisplayPosition) {
      if (user) {
        scrollToBottom();
      }
      setResetDisplayPosition(false);
    }
  }, [user, resetDisplayPosition, setResetDisplayPosition]);

  useEffect(() => {
    // 新規コメント作成・メモ編集時のスクロール
    if (scrollingID) {
      // HACK: 正しいオブジェクトサイズを取得するためにsetTimeoutで暫定対応
      setTimeout(() => {
        scrollToTargetMemo(scrollingID, 'smooth');
      }, 1);
      setScrollingIDState('');
    }
  }, [scrollingID, setScrollingIDState]);

  useEffect(() => {
    // 表示コンテンツ追加時のスクロール
    if (changeDisplayStep) {
      scrollToOriginalPosition();
      setChangeDisplayStep(false);
    }
  }, [changeDisplayStep, setChangeDisplayStep]);

  const [isRendering, setIsRendering] = useState(true);

  useEffect(() => {
    setIsRendering(false);
  }, [displayData]);

  useEffect(() => {
    if (!isRendering) {
      initializeClientHeight();
      setIsRendering(true);
    }
  }, [isRendering, setIsRendering]);

  const initializeClientHeight = () => {
    const element = document.getElementById('contents');
    if (element !== null) {
      clientHeight.current = [element.clientHeight];
    }
  };

  const scrollToTop = (behavior: 'smooth' | 'auto' = 'auto') => {
    // HACK: topは必ず0になるけど、タイミングを合わせるためにElementから位置を取得している
    const element = document.documentElement;
    const top = element.offsetTop;
    window.scroll({ top: top, behavior: behavior });
  };

  const scrollToBottom = (behavior: 'smooth' | 'auto' = 'auto') => {
    const element = document.documentElement;
    const bottom = element.scrollHeight - (visualViewport?.height ?? element.clientHeight);
    window.scroll({ top: bottom, behavior: behavior });
  };

  const scrollToTargetMemo = (id: string, behavior: 'smooth' | 'auto' = 'auto') => {
    const element = document.getElementsByClassName(`content${id}`);
    if (element.length === 0) return;

    const elementLocation = element[0].getBoundingClientRect();

    const upperLimit = window.scrollY + (window.innerWidth >= 600 ? 64 : 56);
    const targetBottom = elementLocation.bottom + window.scrollY + 16;
    const lowerLimit =
      (visualViewport?.height ?? window.innerHeight) +
      window.scrollY -
      (window.innerWidth >= 600 ? 80 : 72);

    if (upperLimit >= targetBottom || lowerLimit <= targetBottom) {
      const targetPotision =
        targetBottom -
        ((visualViewport?.height ?? window.innerHeight) - (window.innerWidth >= 600 ? 80 : 72));
      window.scroll({ top: targetPotision, behavior: behavior });
    }
  };

  const scrollToOriginalPosition = (behavior: 'smooth' | 'auto' = 'auto') => {
    const element = document.getElementById('contents');
    if (element !== null) {
      const beforeClientHeight = clientHeight.current[clientHeight.current.length - 1];
      if (beforeClientHeight !== undefined) {
        const scrollPosition = element.clientHeight - beforeClientHeight;
        if (scrollPosition !== 0) {
          window.scroll({ top: scrollPosition, behavior: behavior });
        }
      }
      if (!clientHeight.current.includes(element.clientHeight)) {
        clientHeight.current.push(element.clientHeight);
      }
    }
  };
};
