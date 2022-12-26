import { useSettingInfoContext } from '../components/SettingInfoContext';
import useMediaQuery from '@mui/material/useMediaQuery';
import { createTheme, responsiveFontSizes } from '@mui/material/styles';
import { setLocalStorageDarkMode } from '../utils/setLocalStorageDarkMode';
import { getLocalStorageDarkMode } from '../utils/getLocalStorageDarkMode';
import { useLayoutEffect, useState, useEffect } from 'react';

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
