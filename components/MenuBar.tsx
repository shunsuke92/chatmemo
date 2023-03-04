import { useRecoilValue, useSetRecoilState } from 'recoil';

import MenuIcon from '@mui/icons-material/Menu';
import AppBar from '@mui/material/AppBar';
import IconButton from '@mui/material/IconButton';
import Toolbar from '@mui/material/Toolbar';

import { Mask } from '../components/Mask';
import { Synchronizing } from '../components/Synchronizing';
import { useBarBackground, useLightModeColor } from '../hooks/useColor';
import { openSideDrawerState } from '../states/openSideDrawerState';
import { selectedDisplayTypeState } from '../states/selectedDisplayTypeState';
import { Login } from './Login';
import { MyTypography } from './MyTypography';
import { User } from './User';

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
          boxShadow: 'none',
        }}
      >
        <Mask height={{ xs: '56px', sm: '64px' }} top={0} />
        <Synchronizing progress={true} />
        <Toolbar>
          <IconButton
            size='large'
            edge='start'
            aria-label='open menu'
            sx={{ mr: 2, color: lightModeColor }}
            onClick={handleClickOpenMenu}
          >
            <MenuIcon />
          </IconButton>
          <MyTypography variant='subtitle1'>{title}</MyTypography>
          <Login />
          <User />
        </Toolbar>
      </AppBar>
    </>
  );
};
