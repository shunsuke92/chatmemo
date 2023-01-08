import { useEffect } from 'react';
import { Timeline } from './Timeline';
import { useRecoilValue, useSetRecoilState, useRecoilState } from 'recoil';
import { scheduledScrollingState } from '../states/scheduledScrollingState';
import { resetDisplayPositionState } from '../states/resetDisplayPositionState';
import { scrollingIDState } from '../states/scrollingIDState';
import { isRenderingState } from '../states/isRenderingState';
import { useChangeScheduledScrolling } from '../hooks/useChangeScheduledScrolling';
import { useCreateDisplayData } from '../hooks/useCreateDisplayData';
import { authUserState } from '../states/authUserState';

export default function Contents() {
  const user = useRecoilValue(authUserState);
  const setIsRendering = useSetRecoilState(isRenderingState);
  const scheduledScrolling = useRecoilValue(scheduledScrollingState);
  const [resetDisplayPosition, setResetDisplayPosition] = useRecoilState(resetDisplayPositionState);
  const [scrollingID, setScrollingIDState] = useRecoilState(scrollingIDState);

  const displayData = useCreateDisplayData();
  const changeScheduledScrolling = useChangeScheduledScrolling();

  useEffect(() => {
    // 初回のスクロール
    clearScrollBehavior();
    if (user) {
      scrollToBottom();
    } else {
      scrollToTop();
    }
    addScrollBehavior();
    setIsRendering(false);
  }, [user, setIsRendering]);

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

  const scrollToTop = () => {
    // HACK: topは必ず0になるけど、タイミングを合わせるためにElementから位置を取得している
    const element = document.documentElement;
    const top = element.offsetTop;
    window.scroll(0, top);
  };

  const scrollToBottom = () => {
    const element = document.documentElement;
    const bottom = element.scrollHeight - element.clientHeight;
    window.scroll(0, bottom);
  };

  const scrollToTargetMemo = (id: string) => {
    const element = document.getElementsByClassName(`content${id}`);
    if (element.length === 0) return;

    const elementLocation = element[0].getBoundingClientRect();

    const upperLimit = window.scrollY + (window.innerWidth >= 600 ? 64 : 56);
    const targetBottom = elementLocation.bottom + window.scrollY + 16;
    const lowerLimit = window.innerHeight + window.scrollY - (window.innerWidth >= 600 ? 80 : 72);

    if (upperLimit >= targetBottom || lowerLimit <= targetBottom) {
      const targetPotision =
        targetBottom - (window.innerHeight - (window.innerWidth >= 600 ? 80 : 72));
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

  return <Timeline data={displayData} />;
}
