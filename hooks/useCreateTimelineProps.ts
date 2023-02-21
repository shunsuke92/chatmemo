import { useRecoilValue } from 'recoil';

import { useDelayCompletedContext } from '../components/DelayCompletedContext';
import { useChangeAddingContentID } from '../hooks/useChangeAddingContentID';
import { useChangeDisplayAlertDialog } from '../hooks/useChangeDisplayAlertDialog';
import { useChangeEditingContentID } from '../hooks/useChangeEditingContentID';
import { useMemoBackground, useCommentBackground } from '../hooks/useColor';
import { useCreateEditingInfo } from '../hooks/useCreateEditingInfo';
import { useOperateDeleteMemo } from '../hooks/useOperateDeleteMemo';
import { useOperateRevertMemo } from '../hooks/useOperateRevertMemo';
import { useOperateUpdateServerCompleted } from '../hooks/useOperateUpdateServerCompleted';
import { addingContentIDState } from '../states/addingContentIDState';
import { editingContentIDState } from '../states/editingContentIDState';
import { Memo } from '../states/memoState';
import { selectedDisplayTypeState } from '../states/selectedDisplayTypeState';
import { convertInternalDataToMemo } from '../utils/convertInternalDataToMemo';

const useGetIsAddingContents = () => {
  const addingContentID = useRecoilValue(addingContentIDState);

  return (id: string): boolean => {
    return id === addingContentID;
  };
};

const useGetIsEditingContents = () => {
  const editingContentID = useRecoilValue(editingContentIDState);
  return (id: string) => {
    return id === editingContentID;
  };
};

export const useCreateTimelineProps = () => {
  const getIsAddingContents = useGetIsAddingContents();
  const getIsEditingContents = useGetIsEditingContents();
  const selectedDisplayType = useRecoilValue(selectedDisplayTypeState);
  const getIsTrash = selectedDisplayType.id === 3;
  const getIsAllMemo = selectedDisplayType.id === 1;
  const delayCompleted = useDelayCompletedContext();
  const memoBackground = useMemoBackground();
  const commentBackground = useCommentBackground();
  const changeAddingContentID = useChangeAddingContentID();
  const changeDisplayAlertDialog = useChangeDisplayAlertDialog();
  const changeEditingContentID = useChangeEditingContentID();
  const deleteMemo = useOperateDeleteMemo();
  const revertMemo = useOperateRevertMemo();
  const updateServerCompleted = useOperateUpdateServerCompleted();
  const createEditingInfo = useCreateEditingInfo();

  const createProps = (memo: Memo) => {
    return {
      data: convertInternalDataToMemo(memo),
      isAddingContents: getIsAddingContents(memo._id),
      isEditingContents: getIsEditingContents(memo._id),
      isTrash: getIsTrash,
      isAllMemo: getIsAllMemo,
      delayCompleted: delayCompleted,
      memoBackground: memoBackground,
      commentBackground: commentBackground,
      changeAddingContentID: changeAddingContentID,
      changeDisplayAlertDialog: changeDisplayAlertDialog,
      changeEditingContentID: changeEditingContentID,
      deleteMemo: deleteMemo,
      revertMemo: revertMemo,
      updateServerCompleted: updateServerCompleted,
      createEditingInfo: createEditingInfo,
    };
  };

  return createProps;
};
