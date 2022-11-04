import { Box } from '@mui/system';
import { useOperationContext } from './OperationContext';
import { useMaskBackground } from '../hooks/useColor';

interface MaskProps {
  height: any;
  top: any;
}

export default function Mask(props: MaskProps) {
  const { height, top } = props;
  const info = useOperationContext();
  const maskBackground = useMaskBackground();

  const isAdding: boolean =
    info?.addingContentID !== undefined ? info?.addingContentID.length > 0 : false;

  const isEditing: boolean =
    info?.editingContentID !== undefined ? info?.editingContentID.length > 0 : false;

  const isDisplay: boolean = isAdding || isEditing;

  const handleClick = () => {
    info?.clearAddingContentID();
    info?.clearEditingContentID();
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
}
