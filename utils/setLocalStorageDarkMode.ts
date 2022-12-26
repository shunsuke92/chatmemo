import { localStorageAvailable } from './localStorageAvailable';

export const setLocalStorageDarkMode = (data: string) => {
  if (localStorageAvailable()) {
    localStorage.setItem('darkmode', data);
  }
};
