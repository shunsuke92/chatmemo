import Stack from '@mui/material/Stack';

import { AlertDialog } from '../states/displayAlertDialogState';
import { AddCommentButton } from './AddCommentButton';
import { MoreButton } from './MoreButton';
import { InternalData } from './Timeline';

interface LowerButtonsProps {
  data: InternalData;
  isTrash: boolean;
  isAllMemo: boolean;
  changeAddingContentID: (id: string) => void;
  changeDisplayAlertDialog: (value: AlertDialog, deleteID?: string | undefined) => void;
  changeEditingContentID: (id: string) => void;
  deleteMemo: (id: string | undefined) => Promise<void>;
  revertMemo: (id: string | undefined) => Promise<void>;
  createEditingInfo: (data: InternalData) => void;
}

export const LowerButtons = (props: LowerButtonsProps) => {
  const {
    data,
    isTrash,
    isAllMemo,
    changeAddingContentID,
    changeDisplayAlertDialog,
    changeEditingContentID,
    deleteMemo,
    revertMemo,
    createEditingInfo,
  } = props;

  return (
    <Stack spacing={1} direction='row' justifyContent='space-between' alignItems='center'>
      {isAllMemo && <AddCommentButton data={data} changeAddingContentID={changeAddingContentID} />}
      <MoreButton
        data={data}
        isTrash={isTrash}
        isAllMemo={isAllMemo}
        changeDisplayAlertDialog={changeDisplayAlertDialog}
        changeEditingContentID={changeEditingContentID}
        deleteMemo={deleteMemo}
        revertMemo={revertMemo}
        createEditingInfo={createEditingInfo}
      />
    </Stack>
  );
};
