import { useState } from 'react';
import Button from '@mui/material/Button';
import { app,provider } from '../src/firebase';
import { getAuth,signInWithRedirect } from "firebase/auth";
import { useAuthContext } from './AuthContext';
import Dialog from '@mui/material/Dialog';
import { Box } from '@mui/system';

interface LoginDialogProps {
  open: boolean;
  onClick: () => void;
  onClose: () => void;
}

function LoginDialog(props: LoginDialogProps) {
  const { open,onClose,onClick } = props;

  const handleClose = () => {
    onClose();
  }

  const handleClick = () => {
    onClick();
  }

  return (
    <Dialog onClose={handleClose} open={open}>
      <Box sx={{
        width: 300,
        height: 200,
        bgcolor: 'common.white',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}>

        <Button sx={{textTransform: 'none' }} variant="contained" onClick={handleClick}>Googleログイン</Button>
      </Box>
    </Dialog>
  )
}

export default function Login() {
  const [open, setOpen] = useState(false);
  const user = useAuthContext();

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const handleSignInWithGoogle = () => {
    const auth = getAuth(app);
    signInWithRedirect(auth, provider)
  }
  
  return (
    <div>
      {!user && <Button variant='contained' onClick={handleClickOpen}>ログイン</Button>}
      <LoginDialog open={open} onClick={handleSignInWithGoogle} onClose={handleClose} />
    </div>
  )
}
