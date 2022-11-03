import { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import { Box } from '@mui/system';
import SendIcon from '@mui/icons-material/Send';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import { useDataContext } from '../components/DataContext';
import { useOperationContext } from './OperationContext';
import { useBarBackground } from '../hooks/useColor';
import Synchronizing from '../components/Synchronizing';

export default function BottomBar() {
  const data = useDataContext();
  const info = useOperationContext();
  const barBackground = useBarBackground();

  const [value, setValue] = useState('');

  const isAdding = info?.addingContentID !== undefined ? info?.addingContentID.length > 0 : false;
  const addingContentID = info?.addingContentID !== undefined ? info?.addingContentID : '';
  const isEditing =
    info?.editingContentID !== undefined ? info?.editingContentID.length > 0 : false;

  useEffect(() => {
    if (info?.addingContentID !== undefined ? info?.addingContentID.length > 0 : false) {
      document.getElementById('input')?.focus();
    } else {
      document.getElementById('input')?.blur();
    }
  }, [info?.addingContentID]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  const handleClick = (id: string) => {
    if (isAdding) {
      data?.createComment(
        {
          id: 0,
          body: value,
          createdAt: '',
          updatedAt: '',
          deleted: false,
          deletedAt: '',
          _text: value.split(/\r\n|\n|\r/gm),
          _date: '',
          _time: '',
          _synchronized: false,
          _type: 'comment',
          _id: '',
        },
        id,
      );
    } else {
      data?.createMemo({
        id: 0,
        body: value,
        createdAt: '',
        updatedAt: '',
        completed: false,
        completedAt: '',
        deleted: false,
        deletedAt: '',
        comments: [],
        _text: value.split(/\r\n|\n|\r/gm),
        _date: '',
        _time: '',
        _synchronized: false,
        _tmpCompleted: false,
        _tmpCompletedAt: '',
        _type: 'memo',
        _id: '',
      });
    }

    setValue('');
  };

  const hasValidString = (string: string): boolean => {
    const validString: string = string.replace(/\r\n|\n|\r|\s/gm, '');
    return validString ? true : false;
  };

  const handleClickMask = () => {
    info?.clearAddingContentID();
    info?.clearEditingContentID();
  };

  const handleClickInputArea = (event: React.MouseEvent<HTMLDivElement>) => {
    if (isAdding) {
      event.stopPropagation();
      document.getElementById('input')?.focus();
    }
  };

  return (
    <Box
      onClick={handleClickMask}
      sx={{
        position: 'fixed',
        bottom: 0,
        width: '100%',
        display: 'flex',
        alignItems: 'flex-end',
        justifyContent: 'center',
        height: { xs: 72, sm: 80 },
        pb: { xs: 2, sm: 2.5 },
        ...barBackground,
      }}
    >
      <Synchronizing progress={false} />
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
          placeholder='メモを入力'
          size='small'
          onChange={handleChange}
          sx={{
            width: 500,
            zIndex: isAdding ? 2500 : null,
            position: isAdding ? 'relative' : null,
          }}
          disabled={isEditing}
        />
        {hasValidString(value) ? (
          <IconButton
            aria-label='send'
            color='primary'
            onClick={() => handleClick(addingContentID)}
            sx={{
              display: 'flex',
              alignItems: 'flex-end',
              justifyContent: 'center',
            }}
          >
            <SendIcon />
          </IconButton>
        ) : (
          <IconButton
            aria-label='send'
            color='primary'
            disabled
            sx={{
              display: 'flex',
              alignItems: 'flex-end',
              justifyContent: 'center',
            }}
          >
            <SendIcon />
          </IconButton>
        )}
      </Stack>
    </Box>
  );
}
