import { useLayoutEffect } from 'react';

import { createTheme, responsiveFontSizes } from '@mui/material/styles';

import { useGetDarkMode } from './useGetDarkMode';

export const useCreateTheme = () => {
  const mode = useGetDarkMode();

  const theme = responsiveFontSizes(
    createTheme({
      palette: {
        mode: mode,
        text: {
          primary: mode === 'light' ? '#444444' : '#ffffff',
          secondary: mode === 'light' ? '#666666' : '#dddddd',
        },
        background: {
          default: mode === 'light' ? '#f9f9f9' : '#161616',
        },
      },
      typography: {
        fontFamily: ['Roboto', 'Noto Sans JP', 'Helvetica', 'Arial', 'sans-serif'].join(','),
      },
      zIndex: {
        tooltip: 3000,
      },
    }),
  );

  useLayoutEffect(() => {
    const html = document.getElementById('html');
    if (html !== null) {
      html.style.colorScheme = mode;
      html.style.backgroundColor = theme.palette.background.paper;
    }
  }, [mode, theme.palette.background.paper]);

  return theme;
};
