import { useState } from 'react';

import { useSetRecoilState } from 'recoil';

import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';

import { useDarkMode } from '../hooks/useDarkMode';
import { useUpdateEditingInfoAfter } from '../hooks/useUpdateEditingInfoAfter';
import { scrollingIDState } from '../states/scrollingIDState';
import { InternalData } from './Timeline';

interface CommonTextFieldProps {
  data: InternalData;
}

export const CommonTextField = (props: CommonTextFieldProps) => {
  const { data } = props;

  const [value, setValue] = useState(data.text.join('\n'));

  const updateEditingInfoAfter = useUpdateEditingInfoAfter();

  const setScrollingID = useSetRecoilState(scrollingIDState);

  const darkMode = useDarkMode();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);

    if (data.type === 'memo') {
      updateEditingInfoAfter(event.target.value);
    } else {
      updateEditingInfoAfter(event.target.value, data.id);
    }

    const id = data.type === 'memo' ? data.id : data.memoID;
    if (id !== undefined) {
      // スクロール予約
      setScrollingID(id);
    }
  };

  return (
    <Stack sx={{ display: 'flex', alignItems: 'flex-start' }}>
      <TextField
        value={value}
        variant='outlined'
        size='small'
        fullWidth
        multiline
        sx={{
          width: '479px',
          maxWidth: '65vw',
          '& > div': { backgroundColor: darkMode ? null : 'grey.50' },
        }}
        onChange={handleChange}
      />
    </Stack>
  );
};
