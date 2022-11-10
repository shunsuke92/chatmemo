import IconButton from '@mui/material/IconButton';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useDataContext } from './DataContext';
import { useOperationContext } from './OperationContext';
import { useEditingInfoContext } from './EditingInfoContext';
import { useState } from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { InternalData, useGetIsTrash, useGetIsAllMemo } from './Timeline';

interface MoreButtonProps {
  data: InternalData;
}

export const MoreButton = (props: MoreButtonProps) => {
  const { data } = props;

  const info = useOperationContext();
  const displayData = useDataContext();
  const editingInfo = useEditingInfoContext();
  const isTrash = useGetIsTrash();
  const idAllMemoTab = useGetIsAllMemo();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const open = Boolean(anchorEl);

  function handleClickMore(event: React.MouseEvent<HTMLButtonElement>) {
    setAnchorEl(event.currentTarget);
  }

  const handleClose = () => {
    setAnchorEl(null);
  };

  function handleClickEdit(id: string) {
    return function () {
      if (info?.editingContentID === id) {
        info?.clearEditingContentID();
        editingInfo?.clearEditingContentInfo();
      } else {
        info?.changeEditingContentID(id);
        editingInfo?.createEditingContentInfo(id);
      }
      setAnchorEl(null);
    };
  }

  function handleClickDelete(id: string) {
    return function () {
      if (isTrash) {
        // 完全削除のダイアログを表示
        info?.changeDisplayAlertDialog('complete-deletion-memo', id);
      } else {
        // ごみ箱に移動
        displayData?.deleteMemo(id);
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
        {idAllMemoTab && (
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
