import MenuBar from '../components/MenuBar';
import Mask from '../components/Mask';
import Synchronizing from '../components/Synchronizing';
import DeleteMemoAlertDialog from '../components/DeleteMemoAlertDialog';
import DeleteAccountAlertDialog from '../components/DeleteAccountAlertDialog';
import CompleteDeletionMemoAlertDialog from '../components/CompleteDeletionMemoAlertDialog';
import Contents from '../components/Contents';
import BottomBar from '../components/BottomBar';
import { Data } from '../components/Data';
import { useRecoilValue } from 'recoil';
import { addingContentIDState } from '../states/addingContentIDState';
import { editingContentIDState } from '../states/editingContentIDState';
import Stack from '@mui/material/Stack';

export const useGetIsAdding = () => {
  const addingContentID = useRecoilValue(addingContentIDState);

  return addingContentID.length > 0;
};

export const useGetIsEditing = () => {
  const editingContentID = useRecoilValue(editingContentIDState);

  return editingContentID.length > 0;
};

export default function Main() {
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
}
