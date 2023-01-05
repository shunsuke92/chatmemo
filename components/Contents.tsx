import { useEffect } from 'react';
import { Timeline } from './Timeline';
import { useRecoilValue, useSetRecoilState, useRecoilState } from 'recoil';
import { scheduledScrollingState } from '../states/scheduledScrollingState';
import { resetDisplayPositionState } from '../states/resetDisplayPositionState';
import { scrollingIDState } from '../states/scrollingIDState';
import { isRenderingState } from '../states/isRenderingState';
import { useChangeScheduledScrolling } from '../hooks/useChangeScheduledScrolling';
import { useCreateDisplayData } from '../hooks/useCreateDisplayData';

export default function Contents() {
  const setIsRendering = useSetRecoilState(isRenderingState);
  const scheduledScrolling = useRecoilValue(scheduledScrollingState);
  const [resetDisplayPosition, setResetDisplayPosition] = useRecoilState(resetDisplayPositionState);
  const [scrollingID, setScrollingIDState] = useRecoilState(scrollingIDState);

  const displayData = useCreateDisplayData();
  const changeScheduledScrolling = useChangeScheduledScrolling();

  useEffect(() => {
    scrollToBottom();
    addScrollBehavior();
    setIsRendering(false);
  }, [setIsRendering]);

  useEffect(() => {
    if (scheduledScrolling) {
      scrollToBottom();
      changeScheduledScrolling(false);
    } else if (resetDisplayPosition) {
      clearScrollBehavior();
      scrollToBottom();
      addScrollBehavior();
      setResetDisplayPosition(false);
    } else if (scrollingID) {
      // HACK: 正しいオブジェクトサイズを取得するためにsetTimeoutで暫定対応
      setTimeout(() => {
        scrollToTargetMemo(scrollingID);
      }, 1);
      setScrollingIDState('');
    }
  }, [
    scheduledScrolling,
    changeScheduledScrolling,
    resetDisplayPosition,
    setResetDisplayPosition,
    scrollingID,
    setScrollingIDState,
  ]);

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
