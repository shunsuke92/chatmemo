import { useEffect } from 'react';
import { Timeline } from './Timeline';
import { useRecoilValue, useSetRecoilState, useRecoilState } from 'recoil';
import { scheduledScrollingState } from '../states/scheduledScrollingState';
import { resetDisplayPositionState } from '../states/resetDisplayPositionState';
import { isRenderingState } from '../states/isRenderingState';
import { useChangeScheduledScrolling } from '../hooks/useChangeScheduledScrolling';
import { useCreateDisplayData } from '../hooks/useCreateDisplayData';

export default function Contents() {
  const setIsRendering = useSetRecoilState(isRenderingState);
  const scheduledScrolling = useRecoilValue(scheduledScrollingState);
  const [resetDisplayPosition, setResetDisplayPosition] = useRecoilState(resetDisplayPositionState);

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
    }
  }, [scheduledScrolling, changeScheduledScrolling, resetDisplayPosition, setResetDisplayPosition]);

  const scrollToBottom = () => {
    const element = document.documentElement;
    const bottom = element.scrollHeight - element.clientHeight;
    window.scroll(0, bottom);
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
