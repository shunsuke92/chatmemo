import { useState } from 'react';
import Button from '@mui/material/Button';
import { app, provider } from '../utils/firebase';
import { getAuth, signInWithRedirect } from 'firebase/auth';
import Dialog from '@mui/material/Dialog';
import { Box } from '@mui/system';
import useMediaQuery from '@mui/material/useMediaQuery';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { useRecoilValue } from 'recoil';
import { authUserState } from '../states/authUserState';
import Logo from './Logo';

interface LoginDialogProps {
  open: boolean;
  onClick: () => void;
  onClose: () => void;
}

function LoginDialog(props: LoginDialogProps) {
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
        sx={{
          width: 500,
          maxWidth: '100%',
          height: 700,
          maxHeight: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
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
        <Stack spacing={2} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Logo type={isDarkMode ? 'dark' : 'light'} />
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
          <Typography variant='subtitle2' gutterBottom>
            使用上の注意事項を記載する
          </Typography>
        </Stack>
      </Box>
    </Dialog>
  );
}

export default function Login() {
  const [open, setOpen] = useState(false);
  const user = useRecoilValue(authUserState);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSignInWithGoogle = () => {
    const auth = getAuth(app);
    signInWithRedirect(auth, provider);
  };

  return (
    <div>
      {!user && (
        <Button variant='contained' onClick={handleClickOpen}>
          ログイン
        </Button>
      )}
      <LoginDialog open={open} onClick={handleSignInWithGoogle} onClose={handleClose} />
    </div>
  );
}
