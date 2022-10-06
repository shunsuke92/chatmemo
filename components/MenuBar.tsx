import { useState } from 'react';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Toolbar from '@mui/material/Toolbar';
import AppBar from '@mui/material/AppBar';
import MenuIcon from '@mui/icons-material/Menu';
import Login from './Login';
import User from './User';
import { useOperationContext } from './OperationContext';
import SideDrawer from './SideDrawer';

export default function MenuBar() {
  const info = useOperationContext();

  const [open, setOpen] = useState(false);

  const title = info?.selectedDisplayType.name;

  const handleClick = () => {
    info?.changeAddingContentID(0);
    info?.changeEditingContentID(0);
  };

  const handleClickOpenMenu = () => {
    setOpen(true);
  };

  return (
    <>
      <AppBar position='fixed' sx={{ backgroundColor: '#000000dd' }} onClick={handleClick}>
        <Toolbar>
          <IconButton
            size='large'
            edge='start'
            color='inherit'
            aria-label='menu'
            sx={{ mr: 2 }}
            onClick={handleClickOpenMenu}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant='subtitle1' component='h2' sx={{ flexGrow: 1 }}>
            {title}
          </Typography>
          <Login />
          <User />
        </Toolbar>
      </AppBar>
      <SideDrawer open={open} setOpen={setOpen} />
    </>
  );
}
