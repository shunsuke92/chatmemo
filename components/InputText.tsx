import { useState } from 'react';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import AddButton from '../components/AddButton';
import { useGetIsAdding } from '../components/Main';
import { useGetIsEditing } from '../components/Main';

export default function InputText() {
  const [value, setValue] = useState('');

  const isAdding = useGetIsAdding();
  const isEditing = useGetIsEditing();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  const handleClickInputArea = (event: React.MouseEvent<HTMLDivElement>) => {
    if (isAdding) {
      event.stopPropagation();
      document.getElementById('input')?.focus();
    }
  };

  return (
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
      />
      <AddButton value={value} setValue={setValue} />
    </Stack>
  );
}
