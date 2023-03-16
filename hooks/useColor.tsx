import { useDarkMode } from './useDarkMode';

export const useBarBackground = () => {
  const darkMode = useDarkMode();

  return { backgroundColor: darkMode ? '#222222dd' : '#f1f1f1dd' };
};

export const useMaskBackground = () => {
  const darkMode = useDarkMode();

  return { backgroundColor: darkMode ? '#000000aa' : '#ffffffbb' };
};

export const useLightModeColor = () => {
  const darkMode = useDarkMode();

  return darkMode ? null : 'primary.main';
};

export const useMemoBackground = () => {
  const darkMode = useDarkMode();

  return darkMode ? 'grey.900' : 'grey.300';
};

export const useCommentBackground = () => {
  const darkMode = useDarkMode();

  return darkMode ? 'grey.800' : 'grey.400';
};

export const useDateColor = () => {
  const darkMode = useDarkMode();

  return darkMode ? 'text.disabled' : 'grey.700';
};

export const useIconColor = () => {
  const darkMode = useDarkMode();

  return darkMode ? 'text.secondary' : 'grey.600';
};
