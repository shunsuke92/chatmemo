import Stack from '@mui/material/Stack';
import Card from '@mui/material/Card';
import { CommonText } from './CommonText';

interface MemoTextProps {
  data: string[];
  memoBackground: string;
}

export const MemoText = (props: MemoTextProps) => {
  const { data, memoBackground } = props;

  return (
    <>
      <Stack sx={{ display: 'flex', alignItems: 'flex-end' }}>
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
          <CommonText data={data} />
        </Card>
      </Stack>
    </>
  );
};
