import { useLayoutEffect } from 'react';

import { createTheme, responsiveFontSizes } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

import { useSettingInfoContext } from '../components/SettingInfoContext';

export const useCreateTheme = () => {
  const settingInfo = useSettingInfoContext();
  const userSelectedDarkMode = settingInfo?.setting.dark_mode ?? 'os';
  const osSelectedDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

  useLayoutEffect(() => {
    const html = document.getElementById('html');
    if (html !== null) {
      html.style.colorScheme = mode;
      html.style.backgroundColor = theme.palette.background.paper;
    }
  });

  const mode =
    userSelectedDarkMode === 'os' ? (osSelectedDarkMode ? 'dark' : 'light') : userSelectedDarkMode;

  const theme = responsiveFontSizes(
    createTheme({
      palette: {
        mode: mode,
      },
      typography: {
        fontFamily: ['Roboto', 'Noto Sans JP', 'Helvetica', 'Arial', 'sans-serif'].join(','),
      },
    }),
  );

  return theme;
};
