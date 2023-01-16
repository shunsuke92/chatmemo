export const hasValidString = (string: string): boolean => {
  const validString = string.replace(/\r\n|\n|\r|\s/gm, '');
  return validString ? true : false;
};
