export const sleep = (second: number) => {
  // 同期的に処理を止める
  return new Promise((resolve) => setTimeout(resolve, second));
};
