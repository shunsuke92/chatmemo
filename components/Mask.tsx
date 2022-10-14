import { Box } from '@mui/system';
import { useOperationContext } from './OperationContext';
import { useMaskBackground } from '../hooks/useColor';

export default function Mask() {
  const info = useOperationContext();
  const maskBackground = useMaskBackground();

  const isAdding: boolean = info?.addingContentID !== undefined ? info?.addingContentID > 0 : false;

  const isEditing: boolean =
    info?.editingContentID !== undefined ? info?.editingContentID > 0 : false;

  const isDisplay: boolean = isAdding || isEditing;

  const handleClick = () => {
    info?.changeAddingContentID(0);
    info?.changeEditingContentID(0);
  };
  return (
    <>
      {isDisplay && (
        <Box
          sx={{
            width: '100%',
            height: { xs: 'calc(100% - 56px - 72px)', sm: 'calc(100% - 64px - 80px)' },
            position: 'fixed',
            top: { xs: 56, sm: 64 },
            zIndex: 2000,
            ...maskBackground,
          }}
          onClick={handleClick}
        ></Box>
      )}
    </>
  );
}
