import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Toolbar from '@mui/material/Toolbar';
import AppBar from '@mui/material/AppBar';
import MenuIcon from '@mui/icons-material/Menu';
import { Login } from './Login';
import { User } from './User';
import { SideDrawer } from './SideDrawer';
import { useBarBackground, useLightModeColor } from '../hooks/useColor';
import { Synchronizing } from '../components/Synchronizing';
import { Mask } from '../components/Mask';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { selectedDisplayTypeState } from '../states/selectedDisplayTypeState';
import { openSideDrawerState } from '../states/openSideDrawerState';

export const MenuBar = () => {
  const barBackground = useBarBackground();
  const lightModeColor = useLightModeColor();

  const selectedDisplayType = useRecoilValue(selectedDisplayTypeState);
  const setOpenSideDrawer = useSetRecoilState(openSideDrawerState);

  const title = selectedDisplayType.name;

  const handleClickOpenMenu = () => {
    setOpenSideDrawer(true);
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
      <SideDrawer />
    </>
  );
};
