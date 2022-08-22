import { useState } from 'react';
import IconButton from '@mui/material/IconButton';
import { app } from '../src/firebase';
import { getAuth,signOut } from "firebase/auth";
import { useAuthContext } from './AuthContext';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';

export default function User() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  
  const user = useAuthContext();
  const userPhotoURL = user?.photoURL !== null ? user?.photoURL : undefined;

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleClickUser = () => {
    console.log('ユーザー名をクリック')
    setAnchorEl(null);
  }

  const handleClickMemo = () => {
    console.log('メモ管理をクリック')
    setAnchorEl(null);
  }

  const handleClickLogout = () => {
    const auth = getAuth(app);
    signOut(auth)
      .then(() => {
        // Signed out
        console.log('サインアウトした')
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode,errorMessage)
        // ..
      });
    setAnchorEl(null);
    /* router.push('/login'); */
  };
  
  return (
    <div>
      {user &&
        <IconButton aria-label="user" onClick={handleClick}>
          <Avatar alt="user" src={userPhotoURL} />
        </IconButton>}
        <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
          <MenuItem onClick={handleClickUser}>
            {user?.displayName}
          </MenuItem>
          <Divider />
          <MenuItem onClick={handleClickMemo}>
            メモ管理
          </MenuItem>
          <MenuItem onClick={handleClickLogout}>
            ログアウト
          </MenuItem>
        </Menu>
    </div>
  )
}
