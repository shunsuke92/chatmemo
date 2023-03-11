import { useState, useEffect } from 'react';

import ClearIcon from '@mui/icons-material/Clear';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';

import { AddButton } from '../components/AddButton';
import { useGetIsAdding } from '../components/Main';
import { useGetIsEditing } from '../components/Main';
import { Mask } from '../components/Mask';
import { useSettingInfoContext } from '../components/SettingInfoContext';
import { useClearAddingContentID } from '../hooks/useClearAddingContentID';
import { useMobileKeyboardOpen } from '../hooks/useMobileKeyboardOpen';
import { useOperateCreateData } from '../hooks/useOperateCreateData';
import { hasValidString } from '../utils/hasValidString';
import { MyTypography } from './MyTypography';

export const InputText = () => {
  const [value, setValue] = useState('');
  const [height, setHeight] = useState(0);

  const isAdding = useGetIsAdding();
  const isEditing = useGetIsEditing();

  const createData = useOperateCreateData();

  const settingInfo = useSettingInfoContext();
  const setting = settingInfo?.setting;

  const [mobileKeyboardOpen, isMobile] = useMobileKeyboardOpen();

  const clearAddingContentID = useClearAddingContentID();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    // Shiftが押されていないEnterでメモの作成を行う
    if (setting?.push_with_enter) {
      if (event.key === 'Enter' && !event.shiftKey && event.keyCode === 13) {
        event.preventDefault();
        if (hasValidString(value)) {
          createMemo();
        }
      }
    }
  };

  const createMemo = () => {
    createData(value);
    setValue('');
  };

  useEffect(() => {
    // コメント追加モードになったら入力欄にフォーカスする
    if (isAdding) {
      document.getElementById('input')?.focus();
    } else {
      document.getElementById('input')?.blur();
    }
  }, [isAdding]);

  const handleClickInputArea = (event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();

    if (!(isMobile && !mobileKeyboardOpen)) {
      // メモ投稿後も入力欄へのフォーカスを維持する
      document.getElementById('input')?.focus();
    }
  };

  const handleClickClearCharacter = () => {
    setValue('');

    // 入力文字クリア後も入力欄へのフォーカスを維持する
    if (!(isMobile && !mobileKeyboardOpen)) {
      document.getElementById('input')?.focus();
    }
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

  useEffect(() => {
    if (!mobileKeyboardOpen) {
      clearAddingContentID();
    }
    // clearAddingContentIDは依存関係に入れない
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mobileKeyboardOpen]);

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
          /* placeholder='メモを入力…' */
          size='small'
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          sx={{
            width: 500,
            zIndex: isAdding ? 2500 : null,
            position: isAdding ? 'relative' : null,
          }}
          disabled={isEditing}
          InputProps={{
            // 擬似placeholder（Safariの速度低下対応）
            startAdornment: (
              <InputAdornment position='start' sx={{ mr: 0, mt: 0.3 }}>
                {!Boolean(value) && (
                  <MyTypography color='text.disabled' sx={{ position: 'fixed' }}>
                    {!isAdding ? 'メモを入力…' : 'コメントを入力…'}
                  </MyTypography>
                )}
              </InputAdornment>
            ),
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
        <AddButton hasValidString={hasValidString(value)} createMemo={createMemo} />
      </Stack>
      <Mask
        height={`${height}px`}
        top={{ xs: `calc(100% - ${height}px)`, sm: `calc(100%  - ${height}px)` }}
      />
    </>
  );
};
