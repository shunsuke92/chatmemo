import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import FolderIcon from '@mui/icons-material/Folder';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import DeleteIcon from '@mui/icons-material/Delete';
import { DisplayType, DISPLAY_TYPE, useOperationContext } from './OperationContext';

interface SideDrawerProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

export default function SideDrawer(props: SideDrawerProps) {
  const { open, setOpen } = props;

  const info = useOperationContext();
  const list1 = DISPLAY_TYPE.slice(0, 2);
  const list2 = DISPLAY_TYPE.slice(2, 3);

  const toggleDrawer = (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
    if (
      event.type === 'keydown' &&
      ((event as React.KeyboardEvent).key === 'Tab' ||
        (event as React.KeyboardEvent).key === 'Shift')
    ) {
      return;
    }

    setOpen(open);
  };

  const handleClick = (data: DisplayType) => () => {
    info?.changeSelectedDisplayType(data);
  };

  return (
    <div>
      <Drawer anchor='left' open={open} onClose={toggleDrawer(false)}>
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
                  <ListItemIcon>{index === 0 ? <FolderIcon /> : <CheckBoxIcon />}</ListItemIcon>
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
                    <DeleteIcon />
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
}
