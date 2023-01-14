import { Box } from '@mui/system';

import { useGetIsAdding } from '../components/Main';
import { useGetIsEditing } from '../components/Main';
import { useClearAddingContentID } from '../hooks/useClearAddingContentID';
import { useClearEditingContentID } from '../hooks/useClearEditingContentID';
import { useMaskBackground } from '../hooks/useColor';

interface MaskProps {
  height: any;
  top: any;
}

export const Mask = (props: MaskProps) => {
  const { height, top } = props;
  const maskBackground = useMaskBackground();

  const clearAddingContentID = useClearAddingContentID();
  const clearEditingContentID = useClearEditingContentID();

  const isAdding = useGetIsAdding();
  const isEditing = useGetIsEditing();

  const isDisplay: boolean = isAdding || isEditing;

  const handleClick = () => {
    clearAddingContentID();
    clearEditingContentID();
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
