import { useState } from 'react';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import { AddButton } from '../components/AddButton';
import { useGetIsAdding } from '../components/Main';
import { useGetIsEditing } from '../components/Main';
import { useEffect } from 'react';
import { Mask } from '../components/Mask';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import ClearIcon from '@mui/icons-material/Clear';

export const InputText = () => {
  const [value, setValue] = useState('');
  const [height, setHeight] = useState(0);

  const isAdding = useGetIsAdding();
  const isEditing = useGetIsEditing();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  const handleClickInputArea = (event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
    document.getElementById('input')?.focus();
  };

  const handleClickClearCharacter = () => {
    setValue('');
    document.getElementById('input')?.focus();
  };

  useEffect(() => {
    // HACK: 正しいオブジェクトサイズを取得するためにsetTimeoutで暫定対応
    setTimeout(() => {
      // マスクサイズを取得する
      const element = document.getElementsByClassName('bottom-bar');
      if (element.length === 0) return;
      setHeight(element[0].clientHeight);
    }, 1);
  });

  return (
    <>
      <Stack
        direction='row'
        spacing={2}
        sx={{ maxWidth: '100vw', pr: 2, pl: 2 }}
        onClick={handleClickInputArea}
      >
        <TextField
          id='input'
          multiline
          maxRows={5}
          value={value}
          placeholder='メモを入力…'
          size='small'
          onChange={handleChange}
          sx={{
            width: 500,
            zIndex: isAdding ? 2500 : null,
            position: isAdding ? 'relative' : null,
          }}
          disabled={isEditing}
          InputProps={{
            endAdornment: (
              <InputAdornment position='end'>
                {Boolean(value) && (
                  <IconButton
                    aria-label='clear input character'
                    onClick={handleClickClearCharacter}
                    edge='end'
                  >
                    <ClearIcon />
                  </IconButton>
                )}
              </InputAdornment>
            ),
          }}
        />
        <AddButton value={value} setValue={setValue} />
      </Stack>
      <Mask
        height={`${height}px`}
        top={{ xs: `calc(100% - ${height}px)`, sm: `calc(100%  - ${height}px)` }}
      />
    </>
  );
};
