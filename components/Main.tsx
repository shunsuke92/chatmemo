import { Box } from '@mui/system';
import { useOperationContext } from './OperationContext';
import { useEffect } from 'react';
import { Timeline } from './Timeline';

export default function Main() {
  const info = useOperationContext();

  useEffect(() => {
    const isScrolling = info?.scheduledScrolling ?? false;
    info?.changeScheduledScrolling(false);
    if (!isScrolling) return;

    // 最下部までスクロール
    const element = document.documentElement;
    const bottom = element.scrollHeight - element.clientHeight;
    window.scroll(0, bottom);

    // 最下部までのスクロールのあとで、html要素にscrollBehaviorを追加する
    const html = document.getElementById('html');
    if (html !== null) {
      html.style.scrollBehavior = 'smooth';
    }
  });

  return (
    <Box
      sx={{
        width: '100%',
        height: '100%',
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
        <Timeline />
      </Box>
    </Box>
  );
}
