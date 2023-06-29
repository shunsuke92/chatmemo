import Stack from '@mui/material/Stack';

interface ContentsWrapperProps {
  children: any;
}

export const ContentsWrapper = (props: ContentsWrapperProps) => {
  const { children } = props;

  return (
    <Stack
      sx={{
        display: 'flex',
        alignItems: 'center',
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        pt: '64px',
        pb: '80px',
        minHeight: 'calc(var(--vh, 1vh) * 100)',
      }}
    >
      {children}
    </Stack>
  );
};
