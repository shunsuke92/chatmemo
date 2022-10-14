import useMediaQuery from '@mui/material/useMediaQuery';
import { useSettingInfoContext } from '../components/SettingInfoContext';

export const useDarkMode = (): boolean => {
  const settingInfo = useSettingInfoContext();
  const setting = settingInfo?.setting;
  const osDarkMode: boolean = useMediaQuery('(prefers-color-scheme: dark)');

  if (setting?.dark_mode !== 'os') {
    return setting?.dark_mode === 'dark';
  } else {
    return osDarkMode;
  }
};
