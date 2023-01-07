import { CommonText } from './CommonText';

interface CommentTextProps {
  data: string[];
}

export const CommentText = (props: CommentTextProps) => {
  const { data } = props;

  return <CommonText data={data} />;
};
