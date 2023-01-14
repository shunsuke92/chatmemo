import EditIcon from '@mui/icons-material/Edit';

import { InternalData } from './Timeline';

interface EditedMarkProps {
  data: InternalData;
  isEditingContents: boolean;
}

export const EditedMark = (props: EditedMarkProps) => {
  const { data, isEditingContents } = props;

  const isEdited = data.createdAt !== data.updatedAt;

  return (
    <>{isEdited && !isEditingContents && <EditIcon color='disabled' sx={{ fontSize: 16 }} />}</>
  );
};
