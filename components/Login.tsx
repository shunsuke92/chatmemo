import { useState } from 'react';

import { useRecoilValue, useSetRecoilState } from 'recoil';

import CloseIcon from '@mui/icons-material/Close';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import useMediaQuery from '@mui/material/useMediaQuery';
import { Box } from '@mui/system';

import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';

import { Logo } from './Logo';
import { MyLink } from './MyLink';
import { MyTypography } from './MyTypography';
import { useClearRecoilState } from '../hooks/useClearRecoilState';
import { authUserState } from '../states/authUserState';
import { isLogginginState } from '../states/isLogginginState';
import { app, provider } from '../utils/firebase';

interface LoginDialogProps {
  open: boolean;
  onClick: () => void;
  onClose: () => void;
}

const LoginDialog = (props: LoginDialogProps) => {
  const { open, onClose, onClick } = props;
  const [focus, setFocus] = useState(false);

  const handleClose = () => {
    onClose();
  };

  const handleClick = () => {
    onClick();
  };

  const handleMouseOver = () => {
    setFocus(true);
  };

  const handleMouseLeave = () => {
    setFocus(false);
  };

  const isDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

  return (
    <Dialog onClose={handleClose} open={open}>
      <Box
        pt={7}
        pb={7}
        pr={4}
        pl={4}
        sx={{
          maxWidth: '500px',
          maxHeight: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: isDarkMode ? 'grey.800' : 'grey.100',
        }}
      >
        <IconButton
          size='small'
          aria-label='close'
          onClick={handleClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
        <Stack spacing={4} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Logo type={isDarkMode ? 'dark' : 'light'} />
          <Typography variant='subtitle2' color='text.secondary'>
            ChatMemoはチャット形式のメモアプリです。
            <MyLink href='/about'>ChatMemoについて</MyLink>
          </Typography>
          <Button
            sx={{
              p: 0,
              bgcolor: 'inherit',
              boxShadow: 'none',
              '&:hover': { bgcolor: 'inherit', boxShadow: 'none' },
            }}
            variant='contained'
            onClick={handleClick}
            onMouseOver={handleMouseOver}
            onMouseLeave={handleMouseLeave}
          >
            <Box
              component='img'
              sx={{
                height: 52,
              }}
              alt='google signin'
              src={
                focus
                  ? isDarkMode
                    ? '/google_signin_buttons/btn_google_signin_dark_focus_web@2x.png'
                    : '/google_signin_buttons/btn_google_signin_light_focus_web@2x.png'
                  : isDarkMode
                  ? '/google_signin_buttons/btn_google_signin_dark_normal_web@2x.png'
                  : '/google_signin_buttons/btn_google_signin_light_normal_web@2x.png'
              }
            />
          </Button>
          <MyTypography variant='subtitle2' color='text.secondary'>
            <MyLink href='/about#terms'>利用規約</MyLink>、
            <MyLink href='/about#policy'>プライバシーポリシー</MyLink>
            に同意の上、ご使用ください。
          </MyTypography>
        </Stack>
      </Box>
    </Dialog>
  );
};

export const Login = () => {
  const [open, setOpen] = useState(false);
  const user = useRecoilValue(authUserState);
  const setIsLoggingin = useSetRecoilState(isLogginginState);
  const clearRecoilState = useClearRecoilState();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSignInWithGoogle = () => {
    const auth = getAuth(app);

    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential?.accessToken;
        // The signed-in user info.
        const user = result.user;
        // IdP data available using getAdditionalUserInfo(result)
        // ...
        setOpen(false);
        setIsLoggingin(true);
        clearRecoilState();
        location.reload();
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
      });
  };

  return (
    <div>
      {!user && (
        <Button variant='contained' onClick={handleClickOpen} sx={{ boxShadow: 'none' }}>
          ログイン
        </Button>
      )}
      <LoginDialog open={open} onClick={handleSignInWithGoogle} onClose={handleClose} />
    </div>
  );
};
