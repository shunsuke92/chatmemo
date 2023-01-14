import { useState } from 'react';

import { useSetRecoilState } from 'recoil';

import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';

import { scrollingIDState } from '../states/scrollingIDState';
import { EditingInfo } from './EditingInfoContext';
import { InternalData } from './Timeline';

interface CommonTextFieldProps {
  data: InternalData;
  editingInfo: EditingInfo | undefined;
}

export const CommonTextField = (props: CommonTextFieldProps) => {
  const { data, editingInfo } = props;

  const [value, setValue] = useState(data.text.join('\n'));

  const setScrollingID = useSetRecoilState(scrollingIDState);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);

    if (data.type === 'memo') {
      editingInfo?.updateEditingContentAfter(event.target.value);
    } else {
      editingInfo?.updateEditingContentAfter(event.target.value, data.id);
    }

    // スクロール予約
    setScrollingID(data.type === 'memo' ? data.id : data.memoID ?? '');
  };

  return (
    <Stack sx={{ display: 'flex', alignItems: 'flex-start' }}>
      <TextField
        value={value}
        variant='outlined'
        size='small'
        fullWidth
        multiline
        sx={{ width: '479px' }}
        onChange={handleChange}
      />
    </Stack>
  );
};
