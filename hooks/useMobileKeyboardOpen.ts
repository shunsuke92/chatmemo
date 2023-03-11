import { useState, useEffect, useRef, useMemo } from 'react';

export const useMobileKeyboardOpen = () => {
  const baseHeight = useRef(0);
  const isMobile = useMemo(() => navigator.userAgent.match(/iPhone|Android.+Mobile/), []);
  const [open, setOpen] = useState(false);

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
