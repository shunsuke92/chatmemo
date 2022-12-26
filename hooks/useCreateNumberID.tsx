import { useRef } from 'react';

export const useCreateNumberID = (initial?: number) => {
  const count = useRef(initial ?? 0);

  const createID = () => {
    count.current++;
    return count.current;
  };

  return createID;
};
