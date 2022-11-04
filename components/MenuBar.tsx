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
import { useBarBackground, useLightModeColor } from '../hooks/useColor';
import Synchronizing from '../components/Synchronizing';
import Mask from '../components/Mask';

export default function MenuBar() {
  const info = useOperationContext();
  const barBackground = useBarBackground();
  const lightModeColor = useLightModeColor();

  const [open, setOpen] = useState(false);

  const title = info?.selectedDisplayType.name;

  const handleClickOpenMenu = () => {
    setOpen(true);
  };

  return (
    <>
      <AppBar
        position='fixed'
        sx={{
          backgroundImage: 'none',
          ...barBackground,
        }}
      >
        <Mask height={{ xs: '56px', sm: '64px' }} top={0} />
        <Synchronizing progress={true} />
        <Toolbar>
          <IconButton
            size='large'
            edge='start'
            aria-label='menu'
            sx={{ mr: 2, color: lightModeColor }}
            onClick={handleClickOpenMenu}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant='subtitle1'
            component='h2'
            sx={{ flexGrow: 1, color: lightModeColor }}
          >
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
