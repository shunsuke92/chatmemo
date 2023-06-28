import { createTheme, responsiveFontSizes } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

export const useCreateTheme = () => {
  const mode = useMediaQuery('(prefers-color-scheme: dark)') ? 'dark' : 'light';

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

  return theme;
};
