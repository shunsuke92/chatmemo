import { useRecoilValue } from 'recoil';

import { editingInfoIsChangedState } from '../states/editingInfoIsChangedState';
import { editingInfoState } from '../states/editingInfoState';
import { useOperateUpdateEditData } from './useOperateUpdateEditData';

export const useOverwriteEditingInfo = () => {
  const editingInfo = useRecoilValue(editingInfoState);
  const isChanged = useRecoilValue(editingInfoIsChangedState);

  const updateEditData = useOperateUpdateEditData();

  const OverwriteEditingInfo = () => {
    if (!isChanged || editingInfo?.before === undefined || editingInfo?.after === undefined) return;
    updateEditData(editingInfo?.before, editingInfo?.after);
  };

  return OverwriteEditingInfo;
};
