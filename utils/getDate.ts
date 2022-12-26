export const getDate = (date: string): string => {
  const weekChar = ['日', '月', '火', '水', '木', '金', '土'];
  const usedDate = new Date(date).toLocaleDateString();
  const month = usedDate.substring(5);
  const week = weekChar[new Date(date).getDay()];
  return `${month} (${week})`;
};
