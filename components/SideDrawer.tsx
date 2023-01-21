import { useRecoilState, useSetRecoilState, useRecoilValue } from 'recoil';

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
import ListItemText from '@mui/material/ListItemText';

import { useChangeSelectedDisplayType } from '../hooks/useChangeSelectedDisplayType';
import { useLightModeColor } from '../hooks/useColor';
import { displayStepState } from '../states/displayStepState';
import { openSideDrawerState } from '../states/openSideDrawerState';
import { resetDisplayPositionState } from '../states/resetDisplayPositionState';
import {
  selectedDisplayTypeState,
  DisplayType,
  DISPLAY_TYPE,
} from '../states/selectedDisplayTypeState';

export const SideDrawer = () => {
  const [openSideDrawer, setOpenSideDrawer] = useRecoilState(openSideDrawerState);

  const lightModeColor = useLightModeColor();
  const list1 = DISPLAY_TYPE.slice(0, 2);
  const list2 = DISPLAY_TYPE.slice(2, 3);

  const changeSelectedDisplayType = useChangeSelectedDisplayType();

  const setResetDisplayPosition = useSetRecoilState(resetDisplayPositionState);
  const setDisplayStep = useSetRecoilState(displayStepState);
  const selectedDisplayType = useRecoilValue(selectedDisplayTypeState);

  const toggleDrawer = (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
    if (
      event.type === 'keydown' &&
      ((event as React.KeyboardEvent).key === 'Tab' ||
        (event as React.KeyboardEvent).key === 'Shift')
    ) {
      return;
    }

    setOpenSideDrawer(open);
  };

  const handleClick = (data: DisplayType) => () => {
    if (selectedDisplayType.id !== data.id) {
      changeSelectedDisplayType(data);

      // ページ切り替え時は表示数と表示位置をリセットする
      setResetDisplayPosition(true);
      setDisplayStep(1);
    }
  };

  return (
    <div>
      <Drawer anchor='left' open={openSideDrawer} onClose={toggleDrawer(false)}>
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
                  <ListItemIcon>
                    {index === 0 ? (
                      <FolderIcon sx={{ color: 'text.secondary' }} />
                    ) : (
                      <CheckCircleIcon sx={{ color: 'text.secondary' }} />
                    )}
                  </ListItemIcon>
                  <ListItemText primary={list.name} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
          <Divider />
          <List>
            {list2.map((list) => (
              <ListItem key={list.id} disablePadding>
                <ListItemButton onClick={handleClick(list)}>
                  <ListItemIcon>
                    <DeleteIcon sx={{ color: 'text.secondary' }} />
                  </ListItemIcon>
                  <ListItemText primary={list.name} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>
    </div>
  );
};
