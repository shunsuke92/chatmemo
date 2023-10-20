import { createTheme, responsiveFontSizes } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

export const useCreateTheme = () => {
  const mode = useMediaQuery('(prefers-color-scheme: dark)') ? 'dark' : 'light';

  const theme = responsiveFontSizes(
    createTheme({
      palette: {
        mode: mode,
        text: {
          primary: mode === 'light' ? '#334155' : '#f1f5f9',
          secondary: mode === 'light' ? '#475569' : '#e2e8f0',
        },
        background: {
          paper: mode === 'light' ? '#f1f5f9' : '#0f172a',
          default: mode === 'light' ? '#f1f5f9' : '#0f172a',
        },
        grey: {
          50: '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#94a3b8',
          500: '#64748b',
          600: '#475569',
          700: '#334155',
          800: '#1e293b',
          900: '#0f172a',
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
