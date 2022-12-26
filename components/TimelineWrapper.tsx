import { Box } from '@mui/system';
import Stack from '@mui/material/Stack';

interface TimelineWrapperProps {
  children: any;
}

export default function TimelineWrapper(props: TimelineWrapperProps) {
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
    >
      <Box
        sx={{
          width: '100%',
          maxWidth: 600,
          height: '100%',
          pt: 2,
          pb: 2,
          pr: 3,
          pl: 3,
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
}
