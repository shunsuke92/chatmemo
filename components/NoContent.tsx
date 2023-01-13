import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { useRecoilValue } from 'recoil';
import { selectedDisplayTypeState } from '../states/selectedDisplayTypeState';

export default function NoContent() {
  const selectedDisplayType = useRecoilValue(selectedDisplayTypeState);

  return (
    <Stack mt={2}>
      <Typography variant='h6' component='h2' fontWeight={400}>
        {selectedDisplayType.id === 1
          ? ''
          : selectedDisplayType.id === 2
          ? '実行済みのメモはありません。'
          : 'ごみ箱は空です。'}
      </Typography>
    </Stack>
  );
}
