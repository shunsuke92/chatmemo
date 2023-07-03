import { useRecoilValue } from 'recoil';
import { useSetRecoilState } from 'recoil';

import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';

import { useDarkMode } from '../hooks/useDarkMode';
import { useOverwriteEditingInfo } from '../hooks/useOverwriteEditingInfo';
import { editingContentIDState } from '../states/editingContentIDState';
import { editingInfoIsChangedState } from '../states/editingInfoIsChangedState';
import { editingInfoState } from '../states/editingInfoState';

export const EditCompleteButton = () => {
  const setEditingContentID = useSetRecoilState(editingContentIDState);
  const setEditingInfo = useSetRecoilState(editingInfoState);
  const overwriteEditingInfo = useOverwriteEditingInfo();

  const isChanged = useRecoilValue(editingInfoIsChangedState);

  const darkMode = useDarkMode();

  const handleClickCancel = () => {
    setEditingContentID(undefined);
    setEditingInfo(undefined);
  };

  const handleClickSave = () => {
    overwriteEditingInfo();
    setEditingContentID(undefined);
    setEditingInfo(undefined);
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
