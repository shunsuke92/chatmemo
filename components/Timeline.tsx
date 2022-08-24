import Typography from '@mui/material/Typography';
import { Box } from '@mui/system';
import Stack from '@mui/material/Stack';
import Card from '@mui/material/Card';
import { Data } from '../pages/index';

interface TimelineProps {
  data: Data[];
}

function ChatBox(props: TimelineProps) {
  const { data } = props;

  return (
    <>
      {data.map((d, index) => {
        // 改行コードで分割する
        const message = d.message.split(/\r\n|\n|\r/gm);
        return (
          <Card
            key={index}
            sx={{
              bgcolor: 'grey.800',
              p: 2,
              borderRadius: 2,
              display: 'inline-block',
              width: 'fit-content',
              wordBreak: 'break-word',
            }}
          >
            {message.map((text, index) => {
              if (text) {
                return <Typography key={index}>{text}</Typography>;
              } else {
                return <br key={index}></br>;
              }
            })}
          </Card>
        );
      })}
    </>
  );
}

export default function Timeline(props: TimelineProps) {
  const { data } = props;

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'center',
        paddingBottom: 5,
        maxWidth: 500,
        height: '100%',
        pr: 3,
        pl: 3,
      }}
    >
      <Stack
        spacing={2}
        sx={{ pt: 2, display: 'flex', alignItems: 'flex-end', pb: 11, maxWidth: '100%' }}
      >
        <ChatBox data={data} />
      </Stack>
    </Box>
  );
}
