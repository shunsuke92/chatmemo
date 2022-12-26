import Typography from '@mui/material/Typography';

import Stack from '@mui/material/Stack';
import Card from '@mui/material/Card';

interface MemoTextProps {
  data: string[];
  memoBackground: string;
}

export const MemoText = (props: MemoTextProps) => {
  const { data, memoBackground } = props;

  return (
    <>
      {data.map((text, index) => {
        if (text) {
          return (
            <Stack
              key={index}
              sx={{ display: 'flex', alignItems: index === 0 ? 'flex-end' : 'flex-start' }}
            >
              <Card
                sx={{
                  bgcolor: memoBackground,
                  p: 1,
                  borderRadius: 2,
                  display: 'inline-block',
                  width: 'fit-content',
                  wordBreak: 'break-word',
                  boxShadow: 'none',
                }}
              >
                <Typography key={index}>{text}</Typography>
              </Card>
            </Stack>
          );
        } else {
          return <br key={index}></br>;
        }
      })}
    </>
  );
};
