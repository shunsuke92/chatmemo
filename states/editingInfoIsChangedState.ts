import { selector } from 'recoil';

import { editingInfoState } from './editingInfoState';

export const editingInfoIsChangedState = selector({
  key: 'editingInfoIsChangedState',
  get: ({ get }) => {
    if (get(editingInfoState)?.before.body !== get(editingInfoState)?.after.body) {
      return true;
    }

    for (let i = 0; i < (get(editingInfoState)?.before.comments.length ?? 0); i++) {
      if (
        get(editingInfoState)?.before.comments[i].body !==
        get(editingInfoState)?.after.comments[i].body
      ) {
        return true;
      }
    }
    return false;
  },
});
