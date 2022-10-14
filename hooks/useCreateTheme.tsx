import { useSettingInfoContext } from '../components/SettingInfoContext';
import useMediaQuery from '@mui/material/useMediaQuery';
import { createTheme, responsiveFontSizes } from '@mui/material/styles';

export const useCreateTheme = () => {
  const settingInfo = useSettingInfoContext();
  const userSelectedDarkMode = settingInfo?.setting.dark_mode ?? 'os';
  const osSelectedDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const theme = responsiveFontSizes(
    createTheme({
      palette: {
        mode:
          userSelectedDarkMode === 'os'
            ? osSelectedDarkMode
              ? 'dark'
              : 'light'
            : userSelectedDarkMode,
      },
      typography: {
        fontFamily: ['Roboto', 'Noto Sans JP', 'Helvetica', 'Arial', 'sans-serif'].join(','),
      },
    }),
  );

  return theme;
};
