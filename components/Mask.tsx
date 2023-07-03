import { useSetRecoilState } from 'recoil';

import { Box } from '@mui/system';

import { useGetIsAdding } from '../components/Main';
import { useGetIsEditing } from '../components/Main';
import { useMaskBackground } from '../hooks/useColor';
import { addingContentIDState } from '../states/addingContentIDState';
import { editingContentIDState } from '../states/editingContentIDState';

interface MaskProps {
  height: any;
  top: any;
}

export const Mask = (props: MaskProps) => {
  const { height, top } = props;
  const maskBackground = useMaskBackground();

  const setAddingContentID = useSetRecoilState(addingContentIDState);
  const setEditingContentID = useSetRecoilState(editingContentIDState);

  const isAdding = useGetIsAdding();
  const isEditing = useGetIsEditing();

  const isDisplay: boolean = isAdding || isEditing;

  const handleClick = () => {
    setAddingContentID(undefined);
    setEditingContentID(undefined);
  };

  return (
    <>
      {isDisplay && (
        <Box
          sx={{
            width: '100%',
            height: height,
            position: 'fixed',
            top: top,
            zIndex: 2000,
            ...maskBackground,
          }}
          onClick={handleClick}
        ></Box>
      )}
    </>
  );
};
