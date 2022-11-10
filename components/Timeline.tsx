import Stack from '@mui/material/Stack';
import { TransitionGroup } from 'react-transition-group';
import Collapse from '@mui/material/Collapse';
import { useCreateDisplayData } from '../hooks/useCreateDisplayData';
import { DateChip } from './DateChip';
import { ChatMemo } from './ChatMemo';
import { useOperationContext } from './OperationContext';

export interface InternalData {
  type: 'memo' | 'comment';
  id: string;
  memoID?: string;
  text: string[];
  createdAt: string;
  updatedAt: string;
  date: string;
  time: string;
  synchronized: boolean;
  completed?: boolean;
}

export const getIsOutermost = (data: InternalData): boolean => {
  return data.type === 'memo';
};

export const useGetIsTrash = (): boolean => {
  const info = useOperationContext();

  return info?.selectedDisplayType.id === 3;
};

export const useGetIsAllMemo = (): boolean => {
  const info = useOperationContext();

  return info?.selectedDisplayType.id === 1;
};

export const useGetIsAdding = (data: InternalData): boolean => {
  const info = useOperationContext();

  return data.type === 'memo' && data.id === info?.addingContentID;
};

export const useGetIsEditing = (data: InternalData): boolean => {
  const info = useOperationContext();

  return data.type === 'memo'
    ? data.id === info?.editingContentID
    : data.memoID === info?.editingContentID;
};

export const Timeline = () => {
  const displayData = useCreateDisplayData();
  const info = useOperationContext();

  return (
    <Stack
      spacing={2}
      sx={{
        display: 'flex',
        alignItems: 'flex-end',
        width: '100%',
      }}
    >
      <TransitionGroup
        style={{
          width: '100%',
        }}
      >
        {displayData.map((d) => (
          <Collapse key={d._type === 'memo' ? d._id : d._date} timeout={400} enter={false}>
            {d._type === 'memo' && <ChatMemo key={d._id} data={d} info={info} />}
            {d._type === 'date' && <DateChip date={d._date} />}
          </Collapse>
        ))}
      </TransitionGroup>
    </Stack>
  );
};
