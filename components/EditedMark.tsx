import EditIcon from '@mui/icons-material/Edit';
import { InternalData, useGetIsEditing } from './Timeline';

interface EditedMarkProps {
  data: InternalData;
}

export const EditedMark = (props: EditedMarkProps) => {
  const { data } = props;

  const isEdited = data.createdAt !== data.updatedAt;
  const isEditing: boolean = useGetIsEditing(data);

  return <>{isEdited && !isEditing && <EditIcon color='disabled' sx={{ fontSize: 16 }} />}</>;
};
