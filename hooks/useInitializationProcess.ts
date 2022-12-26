import { useSetRecoilState } from 'recoil';
import { addingContentIDState } from '../states/addingContentIDState';
import { editingContentIDState } from '../states/editingContentIDState';
import { scheduledScrollingState } from '../states/scheduledScrollingState';
import { displayAlertDialogState } from '../states/displayAlertDialogState';
import { deleteIDState } from '../states/deleteIDState';
import { selectedDisplayTypeState, DISPLAY_TYPE } from '../states/selectedDisplayTypeState';
import { isSynchronizingState } from '../states/isSynchronizingState';
import { synchronizingProgressState } from '../states/synchronizingProgressState';

export const useInitializationProcess = () => {
  const setAddingContentID = useSetRecoilState(addingContentIDState);
  const setEditingContentID = useSetRecoilState(editingContentIDState);
  const setScheduledScrolling = useSetRecoilState(scheduledScrollingState);
  const setDisplayAlertDialog = useSetRecoilState(displayAlertDialogState);
  const setDeleteID = useSetRecoilState(deleteIDState);
  const setSelectedDisplayType = useSetRecoilState(selectedDisplayTypeState);
  const setIsSynchronizing = useSetRecoilState(isSynchronizingState);
  const setSynchronizingProgress = useSetRecoilState(synchronizingProgressState);

  function initializationProcess() {
    setAddingContentID('');
    setEditingContentID('');
    setScheduledScrolling(false);
    setDisplayAlertDialog('');
    setDeleteID('');
    setSelectedDisplayType(DISPLAY_TYPE[0]);
    setIsSynchronizing(false);
    setSynchronizingProgress(0);
  }

  return initializationProcess;
};
