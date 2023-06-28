import { useEffect, useRef } from 'react';

import { useRecoilValue } from 'recoil';

import Stack from '@mui/material/Stack';

import { DataController } from './DataController';
import { DataManager } from './DataManager';
import { OfflineNotification } from './OfflineNotification';
import { SideDrawer } from './SideDrawer';
import { BottomBar } from '../components/BottomBar';
import { CompleteDeletionMemoAlertDialog } from '../components/CompleteDeletionMemoAlertDialog';
import { Contents } from '../components/Contents';
import { DeleteAccountAlertDialog } from '../components/DeleteAccountAlertDialog';
import { DeleteMemoAlertDialog } from '../components/DeleteMemoAlertDialog';
import { Mask } from '../components/Mask';
import { MenuBar } from '../components/MenuBar';
import { Synchronizing } from '../components/Synchronizing';
import { useSetIsMobile } from '../hooks/useSetIsMobile';
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
  useSetIsMobile();

  const vw = useRef(0);
  const handleResize = () => {
    if (vw.current === window.innerWidth) {
      // 画面の横幅にサイズ変動がないので処理を終える
      return;
    }

    // 画面の横幅のサイズ変動があった時のみ高さを再計算する
    vw.current = window.innerWidth;
    setFillHeight();
  };
  const setFillHeight = () => {
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
  };

  useEffect(() => {
    window.addEventListener('resize', handleResize);

    // 初期化
    setFillHeight();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  });

  return (
    <>
      <MenuBar />
      <DataManager>
        <Stack
          sx={{
            display: 'flex',
            alignItems: 'center',
            flex: 1,
            flexDirection: 'column',
            justifyContent: 'flex-start',
            pt: '64px',
            pb: '80px',
            minHeight: 'calc(var(--vh, 1vh) * 100)',
          }}
        >
          <Mask
            height={{ xs: 'calc(100% - 56px - 72px)', sm: 'calc(100% - 64px - 80px)' }}
            top={{ xs: '56px', sm: '64px' }}
          />
          <Synchronizing progress={false} />
          <DeleteMemoAlertDialog />
          <DeleteAccountAlertDialog />
          <CompleteDeletionMemoAlertDialog />
          <SideDrawer />
          <OfflineNotification />

          <DataController>
            <Contents />
          </DataController>
        </Stack>
      </DataManager>
      <BottomBar />
    </>
  );
};
