import { EditingInfo } from './EditingInfoContext';
import { useState } from 'react';
import TextField from '@mui/material/TextField';
import { InternalData } from './Timeline';
import { useSetRecoilState } from 'recoil';
import { scrollingIDState } from '../states/scrollingIDState';
import Stack from '@mui/material/Stack';

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
