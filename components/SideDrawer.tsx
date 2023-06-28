import { useRecoilState, useRecoilValue } from 'recoil';

import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import DeleteIcon from '@mui/icons-material/Delete';
import FolderIcon from '@mui/icons-material/Folder';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';

import { MyTypography } from './MyTypography';
import { useChangeOpenMenuDelay } from '../hooks/useChangeOpenMenuDelay';
import { useChangeSelectedDisplayType } from '../hooks/useChangeSelectedDisplayType';
import { useIconColor } from '../hooks/useColor';
import { openSideDrawerState } from '../states/openSideDrawerState';
import {
  selectedDisplayTypeState,
  DisplayType,
  DISPLAY_TYPE,
} from '../states/selectedDisplayTypeState';

export const SideDrawer = () => {
  const [openSideDrawer, setOpenSideDrawer] = useRecoilState(openSideDrawerState);

  const list1 = DISPLAY_TYPE.slice(0, 2);
  const list2 = DISPLAY_TYPE.slice(2, 3);

  const changeSelectedDisplayType = useChangeSelectedDisplayType();

  const selectedDisplayType = useRecoilValue(selectedDisplayTypeState);

  const changeOpenMenuDelay = useChangeOpenMenuDelay();

  const iconColor = useIconColor();

  const toggleDrawer = (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
    if (
      event.type === 'keydown' &&
      ((event as React.KeyboardEvent).key === 'Tab' ||
        (event as React.KeyboardEvent).key === 'Shift')
    ) {
      return;
    }

    setOpenSideDrawer(open);
    changeOpenMenuDelay(open);
  };

  const handleClick = (data: DisplayType) => () => {
    if (selectedDisplayType.id !== data.id) {
      changeSelectedDisplayType(data);
    }
  };

  return (
    <div>
      <Drawer
        anchor='left'
        open={openSideDrawer}
        onClose={toggleDrawer(false)}
        ModalProps={{
          keepMounted: true,
        }}
      >
        <Box
          sx={{ width: 250 }}
          role='presentation'
          onClick={toggleDrawer(false)}
          onKeyDown={toggleDrawer(false)}
        >
          <List>
            {list1.map((list, index) => (
              <ListItem key={list.id} disablePadding>
                <ListItemButton onClick={handleClick(list)}>
                  <ListItemIcon sx={{ minWidth: '42px' }}>
                    {index === 0 ? (
                      <FolderIcon sx={{ color: iconColor }} />
                    ) : (
                      <CheckCircleIcon sx={{ color: iconColor }} />
                    )}
                  </ListItemIcon>
                  <MyTypography mt={0.5} mb={0.5}>
                    {list.name}
                  </MyTypography>
                </ListItemButton>
              </ListItem>
            ))}
          </List>
          <Divider />
          <List>
            {list2.map((list) => (
              <ListItem key={list.id} disablePadding>
                <ListItemButton onClick={handleClick(list)}>
                  <ListItemIcon sx={{ minWidth: '42px' }}>
                    <DeleteIcon sx={{ color: iconColor }} />
                  </ListItemIcon>
                  <MyTypography mt={0.5} mb={0.5}>
                    {list.name}
                  </MyTypography>
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>
    </div>
  );
};
