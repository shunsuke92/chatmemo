export const getTime = (date: string): string => {
  const usedDate = new Date(date).toLocaleTimeString();
  const time = usedDate.substring(0, usedDate.lastIndexOf(':'));
  return time;
};
