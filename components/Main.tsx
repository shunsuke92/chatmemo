import { useRecoilValue } from 'recoil';

import Stack from '@mui/material/Stack';

import { BottomBar } from '../components/BottomBar';
import { CompleteDeletionMemoAlertDialog } from '../components/CompleteDeletionMemoAlertDialog';
import { Contents } from '../components/Contents';
import { Data } from '../components/Data';
import { DeleteAccountAlertDialog } from '../components/DeleteAccountAlertDialog';
import { DeleteMemoAlertDialog } from '../components/DeleteMemoAlertDialog';
import { Mask } from '../components/Mask';
import { MenuBar } from '../components/MenuBar';
import { Synchronizing } from '../components/Synchronizing';
import { addingContentIDState } from '../states/addingContentIDState';
import { editingContentIDState } from '../states/editingContentIDState';

export const useGetIsAdding = () => {
  const addingContentID = useRecoilValue(addingContentIDState);

  return addingContentID.length > 0;
};

export const useGetIsEditing = () => {
  const editingContentID = useRecoilValue(editingContentIDState);

  return editingContentID.length > 0;
};

export const Main = () => {
  return (
    <>
      <MenuBar />
      <Data>
        <Stack
          sx={{
            display: 'flex',
            alignItems: 'center',
            flex: 1,
            flexDirection: 'column',
            justifyContent: 'flex-start',
            pt: '64px',
            pb: '80px',
            minHeight: '100vh',
            opacity: 0.999999 /* スタッキングコンテキストを生成するため */,
          }}
        >
          <Mask height='100%' top={0} />
          <Synchronizing progress={false} />
          <DeleteMemoAlertDialog />
          <DeleteAccountAlertDialog />
          <CompleteDeletionMemoAlertDialog />

          <Contents />
        </Stack>
      </Data>
      <BottomBar />
    </>
  );
};
