import { Box } from '@mui/system';
import { useBarBackground } from '../hooks/useColor';
import { Synchronizing } from '../components/Synchronizing';
import { InputText } from '../components/InputText';
import { useRecoilValue } from 'recoil';
import { selectedDisplayTypeState } from '../states/selectedDisplayTypeState';

export const BottomBar = () => {
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
            minHeight: { xs: 72, sm: 80 },
            pt: { xs: 2, sm: 2.5 },
            pb: { xs: 2, sm: 2.5 },
            ...barBackground,
          }}
          className='bottom-bar'
        >
          <Synchronizing progress={false} />
          <InputText />
        </Box>
      )}
    </>
  );
};
