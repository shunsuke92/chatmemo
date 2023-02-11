import { useEffect, useRef } from 'react';

import { useRecoilValue, useSetRecoilState, useRecoilState } from 'recoil';

import { useChangeScheduledScrolling } from '../hooks/useChangeScheduledScrolling';
import { useCreateDisplayData } from '../hooks/useCreateDisplayData';
import { authUserState } from '../states/authUserState';
import { displayStepState } from '../states/displayStepState';
import { initialScrollingState } from '../states/initialScrollingState';
import { isRenderingState } from '../states/isRenderingState';
import { resetDisplayPositionState } from '../states/resetDisplayPositionState';
import { scheduledScrollingState } from '../states/scheduledScrollingState';
import { scrollingIDState } from '../states/scrollingIDState';
import { NoContent } from './NoContent';
import { Timeline } from './Timeline';

export const Contents = () => {
  const user = useRecoilValue(authUserState);
  const setIsRendering = useSetRecoilState(isRenderingState);
  const scheduledScrolling = useRecoilValue(scheduledScrollingState);
  const [resetDisplayPosition, setResetDisplayPosition] = useRecoilState(resetDisplayPositionState);
  const [scrollingID, setScrollingIDState] = useRecoilState(scrollingIDState);
  const [initialScrolling, setInitialScrolling] = useRecoilState(initialScrollingState);

  const displayData = useCreateDisplayData();
  const changeScheduledScrolling = useChangeScheduledScrolling();

  const clientHeight = useRef<number[]>([]);
  const displayStep = useRecoilValue(displayStepState);

  useEffect(() => {
    setIsRendering(false);
  }, [setIsRendering]);

  useEffect(() => {
    // 初回のスクロール
    if (initialScrolling) {
      clearScrollBehavior();
      if (user) {
        scrollToBottom();
      } else {
        scrollToTop();
      }
      addScrollBehavior();
      setInitialScrolling(false);
    }
  }, [user, initialScrolling, setInitialScrolling]);

  useEffect(() => {
    // 新規メモ作成時のスクロール
    if (scheduledScrolling) {
      scrollToBottom();
      changeScheduledScrolling(false);
    }
  }, [scheduledScrolling, changeScheduledScrolling]);

  useEffect(() => {
    // ページ切り替え時のスクロール
    if (resetDisplayPosition) {
      clearScrollBehavior();
      if (user) {
        scrollToBottom();
      }
      addScrollBehavior();
      setResetDisplayPosition(false);
    }
  }, [user, resetDisplayPosition, setResetDisplayPosition]);

  useEffect(() => {
    // 新規コメント作成・メモ編集時のスクロール
    if (scrollingID) {
      // HACK: 正しいオブジェクトサイズを取得するためにsetTimeoutで暫定対応
      setTimeout(() => {
        scrollToTargetMemo(scrollingID);
      }, 1);
      setScrollingIDState('');
    }
  }, [scrollingID, setScrollingIDState]);

  useEffect(() => {
    // 表示コンテンツ追加
    const element = document.getElementById('contents');
    if (element !== null) {
      const beforeClientHeight = clientHeight.current[clientHeight.current.length - 1];
      const scrollPosition = element.clientHeight - beforeClientHeight;
      if (beforeClientHeight !== undefined && scrollPosition !== 0) {
        clearScrollBehavior();
        window.scroll(0, element?.clientHeight - beforeClientHeight);
        addScrollBehavior();
      }
      clientHeight.current.push(element.clientHeight);
    }
  }, [displayStep]);

  const scrollToTop = () => {
    // HACK: topは必ず0になるけど、タイミングを合わせるためにElementから位置を取得している
    const element = document.documentElement;
    const top = element.offsetTop;
    window.scroll(0, top);
  };

  const scrollToBottom = () => {
    const element = document.documentElement;
    const bottom = element.scrollHeight - (visualViewport?.height ?? element.clientHeight);
    window.scroll(0, bottom);
  };

  const scrollToTargetMemo = (id: string) => {
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
      window.scroll(0, targetPotision);
    }
  };

  const addScrollBehavior = () => {
    const html = document.getElementById('html');
    if (html !== null) {
      html.style.scrollBehavior = 'smooth';
    }
  };

  const clearScrollBehavior = () => {
    const html = document.getElementById('html');
    if (html !== null) {
      html.style.scrollBehavior = 'auto';
    }
  };

  return displayData.length > 0 ? <Timeline data={displayData} /> : <NoContent />;
};
