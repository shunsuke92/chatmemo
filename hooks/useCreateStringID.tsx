import { useRef } from 'react';

export const useCreateStringID = (text: string) => {
  const count = useRef(0);

  const createID = () => {
    count.current++;
    return `${text}${count.current}`;
  };

  return createID;
};
