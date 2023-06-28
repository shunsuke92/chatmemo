import useMediaQuery from '@mui/material/useMediaQuery';

export const useDarkMode = (): boolean => {
  return useMediaQuery('(prefers-color-scheme: dark)');
};
