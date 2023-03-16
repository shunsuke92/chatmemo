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

import { DarkMode, useSettingInfoContext } from '../components/SettingInfoContext';
import { useChangeDisplayAlertDialog } from '../hooks/useChangeDisplayAlertDialog';
import { useChangeOpenMenuDelay } from '../hooks/useChangeOpenMenuDelay';
import { useIconColor } from '../hooks/useColor';
import { useInitializationProcess } from '../hooks/useInitializationProcess';
import { authUserState } from '../states/authUserState';
import { isLoggingoutState } from '../states/isLoggingoutState';
import { isMobileState } from '../states/isMobileState';
import { openUserMenuState } from '../states/openUserMenuState';
import { signout } from '../utils/signout';
import { MyTypography } from './MyTypography';

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
        mt: '12px',
        mb: '12px',
        ml: '16px',
        mr: '16px',
        userSelect: 'none',
        whiteSpace: 'nowrap',
      }}
    >
      {children}
    </Stack>
  );
};

const MyMenuItemSub = (props: any) => {
  const { children } = props;
  return (
    <Stack
      direction='row'
      spacing={1.5}
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-start',
        mt: '-12px',
        mb: '20px',
        ml: '16px',
        mr: '16px',
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
  disabled?: boolean;
}) => {
  const { checked, onChange, disabled } = props;

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (onChange === undefined) return;
    onChange(event.target.checked);
  };

  return (
    <Switch
      checked={checked}
      onChange={handleChange}
      disabled={disabled}
      inputProps={{ 'aria-label': 'switch' }}
    />
  );
};

const HideCompletedSwitch = () => {
  const settingInfo = useSettingInfoContext();
  const setting = settingInfo?.setting;

  return (
    <MySwitch checked={setting?.hide_completed_memo} onChange={settingInfo?.changeHideCompleted} />
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

const PushWithEnterSwitch = () => {
  const settingInfo = useSettingInfoContext();
  const setting = settingInfo?.setting;
  const isMobile = useRecoilValue(isMobileState);

  return (
    <MySwitch
      checked={setting?.push_with_enter}
      onChange={settingInfo?.changePushWithEnter}
      disabled={isMobile}
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

export const User = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [setting, setSetting] = useState(false);

  const user = useRecoilValue(authUserState);
  const userPhotoURL = user?.photoURL !== null ? user?.photoURL : undefined;
  const [openUserMenu, setopenUserMenu] = useRecoilState(openUserMenuState);
  const setIsLoggingout = useSetRecoilState(isLoggingoutState);

  const changeDisplayAlertDialog = useChangeDisplayAlertDialog();
  const initializationProcess = useInitializationProcess();

  const changeOpenMenuDelay = useChangeOpenMenuDelay();

  const isMobile = useRecoilValue(isMobileState);

  const iconColor = useIconColor();

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
    setopenUserMenu(true);
    changeOpenMenuDelay(true);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setopenUserMenu(false);
    changeOpenMenuDelay(false);
    setTimeout(() => setSetting(false), 500);
  };

  const handleClickSetting = () => {
    setSetting(true);
  };

  const handleClickLogout = () => {
    signout();
    setIsLoggingout(true);
    initializationProcess();
    handleClose();
  };

  const handleClickDeleteAccount = () => {
    changeDisplayAlertDialog('delete-account');
    handleClose();
  };

  const handleClickBack = () => {
    setSetting(false);
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
                  <ArrowBackIcon sx={{ color: iconColor }} />
                </IconButton>
                <MyTypography fontWeight={500} fontSize={'1.1rem'}>
                  設定
                </MyTypography>
              </Stack>
            </MyMenuItem>
            <Divider sx={{ mt: 1, mb: 1 }} />
            <MyMenuItem>
              <MyTypography variant='body1'>実行済みを非表示</MyTypography>
              <HideCompletedSwitch />
            </MyMenuItem>
            <MyMenuItem>
              <MyTypography variant='body1'>コメントに日付を表示する</MyTypography>
              <DisplayCommentDateSwitch />
            </MyMenuItem>
            <MyMenuItem>
              <MyTypography variant='body1' color={isMobile ? 'text.disabled' : 'inherit'}>
                Enterで入力する
              </MyTypography>
              <PushWithEnterSwitch />
            </MyMenuItem>
            <MyMenuItemSub>
              <MyTypography
                variant='caption'
                sx={{ color: isMobile ? 'text.disabled' : 'text.secondary' }}
              >
                {isMobile
                  ? 'モバイル端末では利用できません。'
                  : '改行は Shift + Enter になります。'}
              </MyTypography>
            </MyMenuItemSub>
            <MyMenuItem>
              <MyTypography variant='body1'>ダークモード</MyTypography>
              <DarkModeToggleButton />
            </MyMenuItem>
          </div>
        ) : (
          <div>
            <MenuItem sx={{ pointerEvents: 'none' }}>
              <Stack direction='row' spacing={2} sx={{ alignItems: 'center' }}>
                <Avatar alt='user' src={userPhotoURL} sx={{ width: 40, height: 40 }} />
                <MyTypography fontWeight={600} fontSize={'1.1rem'}>
                  {user?.displayName ?? ''}
                </MyTypography>
              </Stack>
            </MenuItem>
            <Divider />
            <MenuItem onClick={handleClickSetting}>
              <Stack direction='row' spacing={1.5}>
                <SettingsIcon sx={{ color: iconColor }} />
                <MyTypography>設定</MyTypography>
              </Stack>
            </MenuItem>
            <Divider />
            <MenuItem onClick={handleClickLogout}>
              <Stack direction='row' spacing={1.5}>
                <LogoutIcon sx={{ color: iconColor }} />
                <MyTypography>ログアウト</MyTypography>
              </Stack>
            </MenuItem>
            <Divider />
            <MenuItem onClick={handleClickDeleteAccount}>
              <Stack direction='row' spacing={1.5}>
                <DangerousIcon color='error' />
                <MyTypography color='error'>アカウント削除</MyTypography>
              </Stack>
            </MenuItem>
          </div>
        )}
      </Menu>
    </div>
  );
};
