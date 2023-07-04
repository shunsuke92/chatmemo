import Stack from '@mui/material/Stack';
import { Box } from '@mui/system';

interface TimelineWrapperProps {
  children: any;
}

export const TimelineWrapper = (props: TimelineWrapperProps) => {
  const { children } = props;

  return (
    <Box
      sx={{
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'center',
      }}
      id='contents'
    >
      <Box
        sx={{
          width: '100%',
          maxWidth: 630,
          height: '100%',
          pt: 2,
          pb: 2,
          pr: 1,
          pl: 2,
        }}
      >
        <Stack
          spacing={2}
          sx={{
            display: 'flex',
            alignItems: 'flex-end',
            width: '100%',
          }}
        >
          {children}
        </Stack>
      </Box>
    </Box>
  );
};
