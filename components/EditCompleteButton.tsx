import Stack from '@mui/material/Stack';
import { useOperationContext } from './OperationContext';
import { useEditingInfoContext } from './EditingInfoContext';
import Button from '@mui/material/Button';

export const EditCompleteButton = () => {
  const info = useOperationContext();
  const editingInfo = useEditingInfoContext();

  const handleClickCancel = () => {
    info?.clearEditingContentID();
  };

  const handleClickSave = () => {
    editingInfo?.overwriteData();
    info?.clearEditingContentID();
  };

  return (
    <Stack spacing={1} direction='row' pt={2} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
      <Button variant='outlined' onClick={handleClickCancel}>
        キャンセル
      </Button>
      <Button variant='contained' onClick={handleClickSave} disabled={!editingInfo?.isChanged()}>
        保存
      </Button>
    </Stack>
  );
};
