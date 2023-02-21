import { useSetRecoilState } from 'recoil';

import { addingContentIDState } from '../states/addingContentIDState';
import { authUserState } from '../states/authUserState';
import { deleteIDState } from '../states/deleteIDState';
import { demoIDState } from '../states/demoIDState';
import { displayAlertDialogState } from '../states/displayAlertDialogState';
import { displayStepState } from '../states/displayStepState';
import { editingContentIDState } from '../states/editingContentIDState';
import { editingInfoState } from '../states/editingInfoState';
import { errIDState } from '../states/errIDState';
import { isAllDisplayedState } from '../states/isAllDisplayedState';
import { isLoggingoutState } from '../states/isLoggingoutState';
import { isRenderingState } from '../states/isRenderingState';
import { isSynchronizingState } from '../states/isSynchronizingState';
import { memoState } from '../states/memoState';
import { openSideDrawerState } from '../states/openSideDrawerState';
import { openUserMenuState } from '../states/openUserMenuState';
import { resetDisplayPositionState } from '../states/resetDisplayPositionState';
import { scheduledScrollingState } from '../states/scheduledScrollingState';
import { scrollingIDState } from '../states/scrollingIDState';
import { selectedDisplayTypeState, DISPLAY_TYPE } from '../states/selectedDisplayTypeState';
import { synchronizingProgressState } from '../states/synchronizingProgressState';

export const useInitializationProcess = () => {
  const setAddingContentID = useSetRecoilState(addingContentIDState);
  const setAuthUser = useSetRecoilState(authUserState);
  const setDeleteID = useSetRecoilState(deleteIDState);
  const setDemoID = useSetRecoilState(demoIDState);
  const setDisplayAlertDialog = useSetRecoilState(displayAlertDialogState);
  const setDisplayStep = useSetRecoilState(displayStepState);
  const setEditingContentID = useSetRecoilState(editingContentIDState);
  const setEditingInfo = useSetRecoilState(editingInfoState);
  const setErrID = useSetRecoilState(errIDState);
  const setIsAllDisplayed = useSetRecoilState(isAllDisplayedState);
  const setIsLoggingout = useSetRecoilState(isLoggingoutState);
  const setIsRendering = useSetRecoilState(isRenderingState);
  const setIsSynchronizing = useSetRecoilState(isSynchronizingState);
  const setMemo = useSetRecoilState(memoState);
  const setOpenSideDrawer = useSetRecoilState(openSideDrawerState);
  const setOpenUserMenu = useSetRecoilState(openUserMenuState);
  const setResetDisplayPosition = useSetRecoilState(resetDisplayPositionState);
  const setScheduledScrolling = useSetRecoilState(scheduledScrollingState);
  const setScrollingID = useSetRecoilState(scrollingIDState);
  const setSelectedDisplayType = useSetRecoilState(selectedDisplayTypeState);
  const setSynchronizingProgress = useSetRecoilState(synchronizingProgressState);

  const initializationProcess = () => {
    setAddingContentID('');
    /* setAuthUser(undefined); */
    setDeleteID('');
    setDemoID(1000);
    setDisplayAlertDialog('');
    setDisplayStep(1);
    setEditingContentID('');
    setEditingInfo(undefined);
    setErrID(0);
    setIsAllDisplayed(true);
    /* setIsLoggingout(false); */
    setIsRendering(true);
    setIsSynchronizing(false);
    setMemo([]);
    setOpenSideDrawer(false);
    setOpenUserMenu(false);
    setResetDisplayPosition(false);
    setScheduledScrolling(false);
    setScrollingID('');
    setSelectedDisplayType(DISPLAY_TYPE[0]);
    setSynchronizingProgress(0);
  };

  return initializationProcess;
};
