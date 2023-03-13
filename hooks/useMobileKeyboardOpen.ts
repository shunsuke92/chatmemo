import { useState, useEffect, useRef, useMemo } from 'react';

export const useMobileKeyboardOpen = () => {
  const [open, setOpen] = useState(false);
  const baseHeight = useRef(0);
  const touch_event = useMemo(() => window.ontouchstart, []);
  const touch_points = useMemo(() => navigator.maxTouchPoints, []);
  const isMobile = useMemo(
    () => touch_event !== undefined && 0 < touch_points,
    [touch_event, touch_points],
  );

  // キーボードが閉じている状態の高さを取得
  useEffect(() => {
    if (isMobile) {
      const element = document.documentElement;
      baseHeight.current = visualViewport?.height ?? element.clientHeight;
    }
  }, [isMobile]);

  const handleResize = () => {
    const element = document.documentElement;
    const height = visualViewport?.height ?? element.clientHeight;
    if (height === baseHeight.current) {
      setOpen(false);
    } else {
      setOpen(true);
    }
  };

  useEffect(() => {
    if (isMobile) {
      window.visualViewport?.addEventListener('resize', handleResize);
    }
    return () => {
      if (isMobile) {
        window.visualViewport?.removeEventListener('resize', handleResize);
      }
    };
  });

  return [open, isMobile];
};
