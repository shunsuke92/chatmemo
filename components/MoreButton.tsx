import { useState } from 'react';

import { useSetRecoilState } from 'recoil';

import MoreVertIcon from '@mui/icons-material/MoreVert';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

import { InternalData } from './Timeline';
import { AlertDialog } from '../states/displayAlertDialogState';
import { editingContentIDState } from '../states/editingContentIDState';
import { scrollingIDState } from '../states/scrollingIDState';

interface MoreButtonProps {
  data: InternalData;
  isTrash: boolean;
  isAllMemo: boolean;
  changeDisplayAlertDialog: (value: AlertDialog, deleteID?: string | undefined) => void;
  deleteMemo: (id: string | undefined) => Promise<void>;
  revertMemo: (id: string | undefined) => Promise<void>;
  createEditingInfo: (data: InternalData) => void;
}

export const MoreButton = (props: MoreButtonProps) => {
  const {
    data,
    isTrash,
    isAllMemo,
    changeDisplayAlertDialog,
    deleteMemo,
    revertMemo,
    createEditingInfo,
  } = props;

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const setScrollingID = useSetRecoilState(scrollingIDState);
  const setEditingContentID = useSetRecoilState(editingContentIDState);

  const open = Boolean(anchorEl);

  const handleClickMore = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleClickEdit = (id: string) => {
    return () => {
      setAnchorEl(null);

      // HACK: 特定条件で意図しないスクロールが発生する事象に対応するため
      //       MUIのMenuコンポーネントで、メニューを開いているときにスクロールを無効にしていることが影響？
      setTimeout(() => {
        setEditingContentID(id);
        createEditingInfo(data);

        // スクロール予約
        setScrollingID(id);
      }, 1);
    };
  };

  const handleClickDelete = (id: string) => {
    return () => {
      if (isTrash) {
        // 完全削除のダイアログを表示
        changeDisplayAlertDialog('complete-deletion-memo', id);
      } else {
        // ごみ箱に移動
        deleteMemo(id);
      }
      setAnchorEl(null);
    };
  };

  const handleClickRevert = (id: string) => {
    return () => {
      revertMemo(id);

      setAnchorEl(null);
    };
  };

  return (
    <>
      <IconButton
        aria-label='more button'
        sx={{ color: 'text.secondary' }}
        onClick={handleClickMore}
        size='small'
      >
        <MoreVertIcon fontSize='small' />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        sx={{ mt: 1 }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        {isAllMemo && (
          <MenuItem onClick={handleClickEdit(data.id)} sx={{ fontSize: '0.8rem' }}>
            編集
          </MenuItem>
        )}
        {isTrash && (
          <MenuItem onClick={handleClickRevert(data.id)} sx={{ fontSize: '0.8rem' }}>
            元に戻す
          </MenuItem>
        )}
        <MenuItem onClick={handleClickDelete(data.id)} sx={{ fontSize: '0.8rem' }}>
          削除
        </MenuItem>
      </Menu>
    </>
  );
};
