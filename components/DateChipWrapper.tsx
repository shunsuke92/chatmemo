import Stack from '@mui/material/Stack';

interface DateChipWrapperProps {
  children: any;
}

export const DateChipWrapper = (props: DateChipWrapperProps) => {
  const { children } = props;

  return (
    <Stack
      spacing={2}
      pt={1}
      sx={{ width: '100%', maxWidth: '100%', display: 'flex', alignItems: 'center' }}
    >
      {children}
    </Stack>
  );
};
