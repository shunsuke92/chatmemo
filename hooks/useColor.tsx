import { useDarkMode } from './useDarkMode';

export const useMaskBackground = () => {
  const darkMode = useDarkMode();

  return { backgroundColor: darkMode ? 'grey.900' : 'grey.100' };
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

  return darkMode ? 'grey.400' : 'grey.800';
};

export const useHoursColor = () => {
  const darkMode = useDarkMode();

  return darkMode ? 'grey.500' : 'grey.700';
};

export const useIconColor = () => {
  const darkMode = useDarkMode();

  return darkMode ? 'text.secondary' : 'grey.600';
};
