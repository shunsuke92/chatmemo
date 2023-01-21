import useMediaQuery from '@mui/material/useMediaQuery';

import { useSettingInfoContext } from '../components/SettingInfoContext';

export const useGetDarkMode = () => {
  const settingInfo = useSettingInfoContext();
  const userSelectedDarkMode = settingInfo?.setting.dark_mode ?? 'os';
  const osSelectedDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

  const mode =
    userSelectedDarkMode === 'os' ? (osSelectedDarkMode ? 'dark' : 'light') : userSelectedDarkMode;

  return mode;
};
