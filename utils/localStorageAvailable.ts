export const localStorageAvailable = () => {
  try {
    const x = '__test__';
    localStorage.setItem(x, x);
    localStorage.removeItem(x);
    return true;
  } catch (e) {
    return false;
  }
};
