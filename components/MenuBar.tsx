import { useRecoilValue, useSetRecoilState } from 'recoil';

import MenuIcon from '@mui/icons-material/Menu';
import AppBar from '@mui/material/AppBar';
import IconButton from '@mui/material/IconButton';
import Toolbar from '@mui/material/Toolbar';

import { Login } from './Login';
import { MyTypography } from './MyTypography';
import { OfflineChip } from './OfflineChip';
import { User } from './User';
import { Mask } from '../components/Mask';
import { Synchronizing } from '../components/Synchronizing';
import { useChangeOpenMenuDelay } from '../hooks/useChangeOpenMenuDelay';
import { openSideDrawerState } from '../states/openSideDrawerState';
import { selectedDisplayTypeState } from '../states/selectedDisplayTypeState';

export const MenuBar = () => {
  const selectedDisplayType = useRecoilValue(selectedDisplayTypeState);
  const setOpenSideDrawer = useSetRecoilState(openSideDrawerState);

  const title = selectedDisplayType.name;

  const changeOpenMenuDelay = useChangeOpenMenuDelay();

  const handleClickOpenMenu = () => {
    setOpenSideDrawer(true);
    changeOpenMenuDelay(true);
  };

  return (
    <>
      <AppBar
        className='fouc-bar-color'
        position='fixed'
        sx={{
          backgroundImage: 'none',
          boxShadow: 'none',
          opacity: 0.8,
        }}
      >
        <Mask height={{ xs: '56px', sm: '64px' }} top={0} />
        <Synchronizing progress={true} />
        <Toolbar>
          <IconButton
            size='large'
            edge='start'
            aria-label='open menu'
            sx={{ mr: 2 }}
            onClick={handleClickOpenMenu}
            className='fouc-text-color'
          >
            <MenuIcon />
          </IconButton>
          <MyTypography className='fouc-text-color' variant='subtitle1'>
            {title}
          </MyTypography>
          <OfflineChip />

          <Login />
          <User />
        </Toolbar>
      </AppBar>
    </>
  );
};
