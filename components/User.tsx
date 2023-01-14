import { useState } from 'react';

import { useRecoilValue, useRecoilState, useSetRecoilState } from 'recoil';

import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import DangerousIcon from '@mui/icons-material/Dangerous';
import LogoutIcon from '@mui/icons-material/Logout';
import SettingsIcon from '@mui/icons-material/Settings';
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Stack from '@mui/material/Stack';
import Switch from '@mui/material/Switch';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import Typography from '@mui/material/Typography';

import { DarkMode, useSettingInfoContext } from '../components/SettingInfoContext';
import { useChangeDisplayAlertDialog } from '../hooks/useChangeDisplayAlertDialog';
import { authUserState } from '../states/authUserState';
import { isLoggingoutState } from '../states/isLoggingoutState';
import { openUserMenuState } from '../states/openUserMenuState';
import { signout } from '../utils/signout';

export const User = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [setting, setSetting] = useState(false);

  const user = useRecoilValue(authUserState);
  const userPhotoURL = user?.photoURL !== null ? user?.photoURL : undefined;
  const [openUserMenu, setopenUserMenu] = useRecoilState(openUserMenuState);
  const setIsLoggingout = useSetRecoilState(isLoggingoutState);

  const changeDisplayAlertDialog = useChangeDisplayAlertDialog();

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
    setopenUserMenu(true);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setopenUserMenu(false);
    setTimeout(() => setSetting(false), 500);
  };

  const handleClickSetting = () => {
    setSetting(true);
  };

  const handleClickLogout = () => {
    signout();
    setIsLoggingout(true);
    handleClose();
  };

  const handleClickDeleteAccount = () => {
    changeDisplayAlertDialog('delete-account');
    handleClose();
  };

  const handleClickBack = () => {
    setSetting(false);
  };

  const MyMenuItem = (props: any) => {
    const { children } = props;
    return (
      <Stack
        direction='row'
        spacing={1.5}
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-start',
          pt: '6px',
          pb: '6px',
          pl: '16px',
          pr: '16px',
          userSelect: 'none',
          whiteSpace: 'nowrap',
        }}
      >
        {children}
      </Stack>
    );
  };

  const MySwitch = (props: {
    checked: boolean | undefined;
    onChange: ((value: boolean) => void) | undefined;
  }) => {
    const { checked, onChange } = props;

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      if (onChange === undefined) return;
      onChange(event.target.checked);
    };

    return (
      <Switch checked={checked} onChange={handleChange} inputProps={{ 'aria-label': 'switch' }} />
    );
  };

  const HideCompletedSwitch = () => {
    const settingInfo = useSettingInfoContext();
    const setting = settingInfo?.setting;

    return (
      <MySwitch
        checked={setting?.hide_completed_memo}
        onChange={settingInfo?.changeHideCompleted}
      />
    );
  };

  const DisplayCommentDateSwitch = () => {
    const settingInfo = useSettingInfoContext();
    const setting = settingInfo?.setting;

    return (
      <MySwitch
        checked={setting?.display_comment_date}
        onChange={settingInfo?.changeDisplayCommentDate}
      />
    );
  };

  const DarkModeToggleButton = () => {
    const settingInfo = useSettingInfoContext();
    const setting = settingInfo?.setting;
    const darkMode = setting?.dark_mode ?? 'os';

    const handleChange = (event: React.MouseEvent<HTMLElement>, newValue: DarkMode) => {
      if (newValue !== null) {
        settingInfo?.changeDarkMode(newValue);
      }
    };

    return (
      <ToggleButtonGroup
        color='primary'
        value={darkMode}
        exclusive
        onChange={handleChange}
        size='small'
        aria-label='dark mode'
      >
        <ToggleButton value='os'>デバイスの設定</ToggleButton>
        <ToggleButton value='dark'>DARK</ToggleButton>
        <ToggleButton value='light'>LIGHT</ToggleButton>
      </ToggleButtonGroup>
    );
  };

  return (
    <div>
      {user && (
        <IconButton aria-label='user' onClick={handleClick} sx={{ p: 0 }}>
          <Avatar
            alt='user'
            src={userPhotoURL}
            sx={{ width: { xs: 24, sm: 32 }, height: { xs: 24, sm: 32 } }}
          />
        </IconButton>
      )}

      <Menu anchorEl={anchorEl} open={openUserMenu} onClose={handleClose} sx={{ mt: 1 }}>
        {setting ? (
          <div>
            <MyMenuItem>
              <Stack direction='row' spacing={2} sx={{ alignItems: 'center' }}>
                <IconButton aria-label='back' onClick={handleClickBack}>
                  <ArrowBackIcon />
                </IconButton>
                <Typography fontWeight={600} fontSize={'1.1rem'}>
                  設定
                </Typography>
              </Stack>
            </MyMenuItem>
            <Divider sx={{ mt: 1, mb: 1 }} />
            <MyMenuItem>
              <Typography>実行済みを非表示</Typography>
              <HideCompletedSwitch />
            </MyMenuItem>
            <MyMenuItem>
              <Typography>コメントに日付を表示する</Typography>
              <DisplayCommentDateSwitch />
            </MyMenuItem>
            <MyMenuItem>
              <Typography>ダークモード</Typography>
              <DarkModeToggleButton />
            </MyMenuItem>
          </div>
        ) : (
          <div>
            <MenuItem sx={{ pointerEvents: 'none' }}>
              <Stack direction='row' spacing={2} sx={{ alignItems: 'center' }}>
                <Avatar alt='user' src={userPhotoURL} sx={{ width: 40, height: 40 }} />
                <Typography fontWeight={600} fontSize={'1.1rem'}>
                  {user?.displayName}
                </Typography>
              </Stack>
            </MenuItem>
            <Divider />
            <MenuItem onClick={handleClickSetting}>
              <Stack direction='row' spacing={1.5}>
                <SettingsIcon />
                <Typography>設定</Typography>
              </Stack>
            </MenuItem>
            <Divider />
            <MenuItem onClick={handleClickLogout}>
              <Stack direction='row' spacing={1.5}>
                <LogoutIcon />
                <Typography>ログアウト</Typography>
              </Stack>
            </MenuItem>
            <Divider />
            <MenuItem onClick={handleClickDeleteAccount}>
              <Stack direction='row' spacing={1.5}>
                <DangerousIcon color='error' />
                <Typography color='error'>アカウント削除</Typography>
              </Stack>
            </MenuItem>
          </div>
        )}
      </Menu>
    </div>
  );
};
