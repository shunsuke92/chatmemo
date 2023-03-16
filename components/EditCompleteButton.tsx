import { useRecoilValue } from 'recoil';

import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';

import { useClearEditingContentID } from '../hooks/useClearEditingContentID';
import { useClearEditingInfo } from '../hooks/useClearEditingInfo';
import { useDarkMode } from '../hooks/useDarkMode';
import { useOverwriteEditingInfo } from '../hooks/useOverwriteEditingInfo';
import { editingInfoIsChangedState } from '../states/editingInfoIsChangedState';

export const EditCompleteButton = () => {
  const clearEditingContentID = useClearEditingContentID();
  const clearEditingInfo = useClearEditingInfo();
  const overwriteEditingInfo = useOverwriteEditingInfo();

  const isChanged = useRecoilValue(editingInfoIsChangedState);

  const darkMode = useDarkMode();

  const handleClickCancel = () => {
    clearEditingContentID();
    clearEditingInfo();
  };

  const handleClickSave = () => {
    overwriteEditingInfo();
    clearEditingContentID();
    clearEditingInfo();
  };

  return (
    <Stack spacing={1} direction='row' pt={2} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
      <Button
        variant='outlined'
        onClick={handleClickCancel}
        sx={{ backgroundColor: darkMode ? null : 'grey.50' }}
      >
        キャンセル
      </Button>
      <Button
        variant='contained'
        onClick={handleClickSave}
        disabled={!isChanged}
        sx={{ boxShadow: 'none' }}
      >
        保存
      </Button>
    </Stack>
  );
};
