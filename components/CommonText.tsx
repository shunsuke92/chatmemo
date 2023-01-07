import Typography from '@mui/material/Typography';

interface CommonTextProps {
  data: string[];
}

export const CommonText = (props: CommonTextProps) => {
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
