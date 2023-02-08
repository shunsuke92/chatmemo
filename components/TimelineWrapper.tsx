import { useEffect } from 'react';

import Stack from '@mui/material/Stack';
import { Box } from '@mui/system';

interface TimelineWrapperProps {
  children: any;
}

export const TimelineWrapper = (props: TimelineWrapperProps) => {
  const { children } = props;

  const setFillHeight = () => {
    const bottomBarHeight = window.innerWidth < 600 ? 72 + 56 : 80 + 64;
    const vh = (window.innerHeight - bottomBarHeight) * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
  };

  useEffect(() => {
    let vw = window.innerWidth;

    window.addEventListener('resize', () => {
      if (vw === window.innerWidth) {
        // 画面の横幅にサイズ変動がないので処理を終える
        return;
      }

      // 画面の横幅のサイズ変動があった時のみ高さを再計算する
      vw = window.innerWidth;
      setFillHeight();
    });

    // 初期化
    setFillHeight();
  });

  return (
    <Box
      sx={{
        width: '100%',
        height: '100%',
        minHeight: 'calc(var(--vh, 1vh) * 100)',
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'center',
      }}
    >
      <Box
        sx={{
          width: '100%',
          maxWidth: 600,
          height: '100%',
          pt: 2,
          pb: 2,
          pr: 3,
          pl: 3,
        }}
      >
        <Stack
          spacing={2}
          sx={{
            display: 'flex',
            alignItems: 'flex-end',
            width: '100%',
          }}
        >
          {children}
        </Stack>
      </Box>
    </Box>
  );
};
