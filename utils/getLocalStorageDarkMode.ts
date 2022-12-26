import { localStorageAvailable } from './localStorageAvailable';

export const getLocalStorageDarkMode = () => {
  if (localStorageAvailable()) {
    const data = localStorage.getItem('darkmode');
    const res = data === 'dark' || data === 'light' ? data : undefined;
    return res;
  }
};
