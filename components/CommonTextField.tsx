import { useState } from 'react';

import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';

import { useUpdateEditingInfoAfter } from '../hooks/useUpdateEditingInfoAfter';
import { InternalData } from './Timeline';

interface CommonTextFieldProps {
  data: InternalData;
}

export const CommonTextField = (props: CommonTextFieldProps) => {
  const { data } = props;

  const [value, setValue] = useState(data.text.join('\n'));

  const updateEditingInfoAfter = useUpdateEditingInfoAfter();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);

    if (data.type === 'memo') {
      updateEditingInfoAfter(event.target.value);
    } else {
      updateEditingInfoAfter(event.target.value, data.id);
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
        sx={{ width: '479px' }}
        onChange={handleChange}
      />
    </Stack>
  );
};
