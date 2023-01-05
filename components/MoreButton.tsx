import IconButton from '@mui/material/IconButton';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { EditingInfo } from './EditingInfoContext';
import { useState } from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { InternalData } from './Timeline';
import { AlertDialog } from '../states/displayAlertDialogState';
import { useSetRecoilState } from 'recoil';
import { scrollingIDState } from '../states/scrollingIDState';

interface MoreButtonProps {
  data: InternalData;
  isTrash: boolean;
  isAllMemo: boolean;
  editingInfo: EditingInfo | undefined;
  changeDisplayAlertDialog: (value: AlertDialog, deleteID?: string | undefined) => void;
  changeEditingContentID: (id: string) => void;
  deleteMemo: (id: string | undefined) => Promise<void>;
}

export const MoreButton = (props: MoreButtonProps) => {
  const {
    data,
    isTrash,
    isAllMemo,
    editingInfo,
    changeDisplayAlertDialog,
    changeEditingContentID,
    deleteMemo,
  } = props;

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const setScrollingID = useSetRecoilState(scrollingIDState);

  const open = Boolean(anchorEl);

  function handleClickMore(event: React.MouseEvent<HTMLButtonElement>) {
    setAnchorEl(event.currentTarget);
  }

  const handleClose = () => {
    setAnchorEl(null);
  };

  function handleClickEdit(id: string) {
    return function () {
      setAnchorEl(null);

      // HACK: 特定条件で意図しないスクロールが発生する事象に対応するため
      //       MUIのMenuコンポーネントで、メニューを開いているときにスクロールを無効にしていることが影響？
      setTimeout(() => {
        changeEditingContentID(id);
        editingInfo?.createEditingContentInfo(data);

        // スクロール予約
        setScrollingID(id);
      }, 1);
    };
  }

  function handleClickDelete(id: string) {
    return function () {
      if (isTrash) {
        // 完全削除のダイアログを表示
        changeDisplayAlertDialog('complete-deletion-memo', id);
      } else {
        // ごみ箱に移動
        deleteMemo(id);
      }
      setAnchorEl(null);
    };
  }

  return (
    <>
      <IconButton
        aria-label='more'
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
        <MenuItem onClick={handleClickDelete(data.id)} sx={{ fontSize: '0.8rem' }}>
          削除
        </MenuItem>
      </Menu>
    </>
  );
};
