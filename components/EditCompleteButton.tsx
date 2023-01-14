import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';

import { useClearEditingContentID } from '../hooks/useClearEditingContentID';
import { EditingInfo } from './EditingInfoContext';

interface EditCompleteButtonProps {
  editingInfo: EditingInfo | undefined;
}

export const EditCompleteButton = (props: EditCompleteButtonProps) => {
  const { editingInfo } = props;

  const clearEditingContentID = useClearEditingContentID();

  const handleClickCancel = () => {
    clearEditingContentID();
    editingInfo?.clearEditingContentInfo();
  };

  const handleClickSave = () => {
    editingInfo?.overwriteData();
    clearEditingContentID();
    editingInfo?.clearEditingContentInfo();
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
