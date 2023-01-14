import Stack from '@mui/material/Stack';

import { AlertDialog } from '../states/displayAlertDialogState';
import { AddCommentButton } from './AddCommentButton';
import { EditingInfo } from './EditingInfoContext';
import { MoreButton } from './MoreButton';
import { InternalData } from './Timeline';

interface LowerButtonsProps {
  data: InternalData;
  isTrash: boolean;
  isAllMemo: boolean;
  editingInfo: EditingInfo | undefined;
  changeAddingContentID: (id: string) => void;
  changeDisplayAlertDialog: (value: AlertDialog, deleteID?: string | undefined) => void;
  changeEditingContentID: (id: string) => void;
  deleteMemo: (id: string | undefined) => Promise<void>;
  revertMemo: (id: string | undefined) => Promise<void>;
}

export const LowerButtons = (props: LowerButtonsProps) => {
  const {
    data,
    isTrash,
    isAllMemo,
    editingInfo,
    changeAddingContentID,
    changeDisplayAlertDialog,
    changeEditingContentID,
    deleteMemo,
    revertMemo,
  } = props;

  return (
    <Stack spacing={1} direction='row' justifyContent='space-between' alignItems='center'>
      {isAllMemo && <AddCommentButton data={data} changeAddingContentID={changeAddingContentID} />}
      <MoreButton
        data={data}
        isTrash={isTrash}
        isAllMemo={isAllMemo}
        editingInfo={editingInfo}
        changeDisplayAlertDialog={changeDisplayAlertDialog}
        changeEditingContentID={changeEditingContentID}
        deleteMemo={deleteMemo}
        revertMemo={revertMemo}
      />
    </Stack>
  );
};
