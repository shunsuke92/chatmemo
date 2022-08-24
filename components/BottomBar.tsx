import { useState } from 'react';
import TextField from '@mui/material/TextField';
import { Box } from '@mui/system';
import SendIcon from '@mui/icons-material/Send';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import { Data } from '../pages/index';

interface BottomBarProps {
  saveData: (data: Data) => void;
}

export default function BottomBar(props: BottomBarProps) {
  const { saveData } = props;

  const [value, setValue] = useState('');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  const handleClick = () => {
    saveData({ message: value, date: '202208241200' });
    setValue('');
  };

  const hasValidString = (string: string): boolean => {
    const validString: string = string.replace(/\r\n|\n|\r|\s/gm, '');
    return validString ? true : false;
  };

  return (
    <Box
      sx={{
        position: 'fixed',
        bottom: 0,
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        pt: 2,
        pb: 3,
        backgroundColor: '#000000dd',
      }}
    >
      <Stack direction='row' spacing={2} sx={{ maxWidth: '100vw', pr: 2, pl: 2 }}>
        <TextField
          multiline
          maxRows={5}
          value={value}
          placeholder='メモを入力'
          size='small'
          sx={{ width: 500 }}
          onChange={handleChange}
        />
        {hasValidString(value) ? (
          <IconButton aria-label='send' color='primary' onClick={handleClick}>
            <SendIcon />
          </IconButton>
        ) : (
          <IconButton aria-label='send' color='primary' disabled>
            <SendIcon />
          </IconButton>
        )}
      </Stack>
    </Box>
  );
}
