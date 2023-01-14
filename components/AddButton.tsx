import { useEffect, SetStateAction } from 'react';

import { useRecoilValue } from 'recoil';

import SendIcon from '@mui/icons-material/Send';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';

import { useGetIsAdding } from '../components/Main';
import { useOperateCreateComment } from '../hooks/useOperateCreateComment';
import { useOperateCreateMemo } from '../hooks/useOperateCreateMemo';
import { addingContentIDState } from '../states/addingContentIDState';

interface AddButtonProps {
  value: string;
  setValue: (value: SetStateAction<string>) => void;
}

export const AddButton = (props: AddButtonProps) => {
  const addingContentID = useRecoilValue(addingContentIDState);

  const createMemo = useOperateCreateMemo();
  const createComment = useOperateCreateComment();

  const isAdding = useGetIsAdding();

  const { value, setValue } = props;

  useEffect(() => {
    if (isAdding) {
      document.getElementById('input')?.focus();
    } else {
      document.getElementById('input')?.blur();
    }
  }, [isAdding]);

  const handleClick = (id: string) => {
    if (isAdding) {
      createComment(
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
          _memoId: '',
        },
        id,
      );
    } else {
      createMemo({
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
    const validString = string.replace(/\r\n|\n|\r|\s/gm, '');
    return validString ? true : false;
  };

  return (
    <Stack sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      {hasValidString(value) ? (
        <IconButton
          aria-label='send'
          color='primary'
          onClick={() => handleClick(addingContentID)}
          sx={{
            zIndex: isAdding ? 2500 : null,
          }}
        >
          <SendIcon />
        </IconButton>
      ) : (
        <IconButton
          aria-label='send'
          disabled
          sx={{
            zIndex: isAdding ? 2500 : null,
          }}
        >
          <SendIcon />
        </IconButton>
      )}
    </Stack>
  );
};
