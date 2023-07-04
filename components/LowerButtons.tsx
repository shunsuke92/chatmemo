import Stack from '@mui/material/Stack';

import { MoreButton } from './MoreButton';
import { InternalData } from './Timeline';
import { AlertDialog } from '../states/displayAlertDialogState';

interface LowerButtonsProps {
  data: InternalData;
  isTrash: boolean;
  isAllMemo: boolean;
  changeDisplayAlertDialog: (value: AlertDialog, deleteID?: string | undefined) => void;
  deleteMemo: (id: string | undefined) => Promise<void>;
  revertMemo: (id: string | undefined) => Promise<void>;
  createEditingInfo: (data: InternalData) => void;
}

export const LowerButtons = (props: LowerButtonsProps) => {
  const {
    data,
    isTrash,
    isAllMemo,
    changeDisplayAlertDialog,
    deleteMemo,
    revertMemo,
    createEditingInfo,
  } = props;

  return (
    <Stack spacing={1} direction='row' justifyContent='space-between' alignItems='center'>
      <MoreButton
        data={data}
        isTrash={isTrash}
        isAllMemo={isAllMemo}
        changeDisplayAlertDialog={changeDisplayAlertDialog}
        deleteMemo={deleteMemo}
        revertMemo={revertMemo}
        createEditingInfo={createEditingInfo}
      />
    </Stack>
  );
};
