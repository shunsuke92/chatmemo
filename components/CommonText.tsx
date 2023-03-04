import { MyTypography } from './MyTypography';

interface CommonTextProps {
  data: string[];
}

export const CommonText = (props: CommonTextProps) => {
  const { data } = props;

  return (
    <>
      {data.map((text, index) => {
        if (text) {
          return <MyTypography key={index}>{text}</MyTypography>;
        } else {
          return <br key={index}></br>;
        }
      })}
    </>
  );
};
