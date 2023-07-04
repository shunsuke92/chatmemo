import { useState } from 'react';

import { useSetRecoilState } from 'recoil';

import Button from '@mui/material/Button';
import InputAdornment from '@mui/material/InputAdornment';
import InputLabel from '@mui/material/InputLabel';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';

import { InternalData } from './Timeline';
import { useDarkMode } from '../hooks/useDarkMode';
import { useOperateCreateData } from '../hooks/useOperateCreateData';
import { addingContentIDState } from '../states/addingContentIDState';
import { scrollingIDState } from '../states/scrollingIDState';

interface AddCommentTextFieldProps {
  data: InternalData;
}

export const AddCommentTextField = (props: AddCommentTextFieldProps) => {
  const { data } = props;

  const [value, setValue] = useState('');

  const setScrollingID = useSetRecoilState(scrollingIDState);
  const createData = useOperateCreateData();
  const setAddingContentID = useSetRecoilState(addingContentIDState);

  const darkMode = useDarkMode();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);

    // スクロール予約
    setScrollingID(data.id);
  };

  const handleClickCancel = () => {
    setAddingContentID(undefined);
  };

  const handleClickSave = () => {
    createData(value);
    setAddingContentID(undefined);
  };

  return (
    <>
      <Stack pt={2}>
        <TextField
          id='input-comment'
          value={value}
          size='small'
          fullWidth
          multiline
          autoFocus
          sx={{
            width: '485px',
            maxWidth: '80vw',
            '& > div': { backgroundColor: darkMode ? 'grey.900' : 'grey.200' },
          }}
          onChange={handleChange}
          InputProps={{
            // 擬似placeholder（Safariの速度低下対応）
            startAdornment: (
              <InputAdornment position='start' sx={{ mr: 0, mt: 0.3 }}>
                {!Boolean(value) && (
                  <InputLabel
                    htmlFor='input-comment'
                    sx={{
                      position: 'absolute',
                      top: '0.55rem',
                      left: '1rem',
                      color: 'text.disabled',
                      mb: 0.3,
                    }}
                  >
                    {'コメントを入力'}
                  </InputLabel>
                )}
              </InputAdornment>
            ),
          }}
        />
      </Stack>
      <Stack
        spacing={1}
        direction='row'
        pt={2}
        sx={{ display: 'flex', justifyContent: 'flex-end' }}
      >
        <Button
          variant='outlined'
          onClick={handleClickCancel}
          sx={{ backgroundColor: darkMode ? null : 'grey.50' }}
        >
          キャンセル
        </Button>
        <Button
          variant='contained'
          onClick={handleClickSave}
          disabled={!value}
          sx={{ boxShadow: 'none' }}
        >
          保存
        </Button>
      </Stack>
    </>
  );
};
