import { Box } from '@mui/system';
import { useBarBackground } from '../hooks/useColor';
import Synchronizing from '../components/Synchronizing';
import Mask from '../components/Mask';
import InputText from '../components/InputText';
import { useRecoilValue } from 'recoil';
import { selectedDisplayTypeState } from '../states/selectedDisplayTypeState';

export default function BottomBar() {
  const selectedDisplayType = useRecoilValue(selectedDisplayTypeState);
  const idDisplay = selectedDisplayType.id === 1;

  const barBackground = useBarBackground();

  return (
    <>
      {idDisplay && (
        <Box
          sx={{
            position: 'fixed',
            bottom: 0,
            width: '100%',
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'center',
            height: { xs: 72, sm: 80 },
            pb: { xs: 2, sm: 2.5 },
            ...barBackground,
          }}
        >
          <Mask
            height={{ xs: '72px', sm: '80px' }}
            top={{ xs: 'calc(100% - 72px)', sm: 'calc(100%  - 80px)' }}
          />
          <Synchronizing progress={false} />
          <InputText />
        </Box>
      )}
    </>
  );
}
