import { EditingInfo } from './EditingInfoContext';
import { useState } from 'react';
import TextField from '@mui/material/TextField';
import { InternalData } from './Timeline';

interface CommonTextFieldProps {
  data: InternalData;
  editingInfo: EditingInfo | undefined;
}

export const CommonTextField = (props: CommonTextFieldProps) => {
  const { data, editingInfo } = props;

  const [value, setValue] = useState(data.text.join('\n'));

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);

    if (data.type === 'memo') {
      editingInfo?.updateEditingContentAfter(event.target.value);
    } else {
      editingInfo?.updateEditingContentAfter(event.target.value, data.id);
    }
  };

  return (
    <TextField
      value={value}
      variant='outlined'
      size='small'
      fullWidth
      multiline
      sx={{ width: '100%', maxWidth: '100%' }}
      onChange={handleChange}
    />
  );
};
