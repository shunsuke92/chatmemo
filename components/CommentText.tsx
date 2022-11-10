import Typography from '@mui/material/Typography';

interface CommentTextProps {
  data: string[];
}

export const CommentText = (props: CommentTextProps) => {
  const { data } = props;

  return (
    <>
      {data.map((text, index) => {
        if (text) {
          return <Typography key={index}>{text}</Typography>;
        } else {
          return <br key={index}></br>;
        }
      })}
    </>
  );
};
