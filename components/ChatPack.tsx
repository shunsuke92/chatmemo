import Stack from '@mui/material/Stack';
import { CompletedButton } from './CompletedButton';
import { EditedMark } from './EditedMark';
import { SynchronizedMark } from './SynchronizedMark';
import { HoursChip } from './HoursChip';
import { ChatCard } from './ChatCard';
import { LowerButtons } from './LowerButtons';
import { InternalData, useGetIsEditing, getIsOutermost } from './Timeline';

interface ChatPackProps {
  data: InternalData;
  children?: any;
}

export const ChatPack = (props: ChatPackProps) => {
  const { data, children } = props;

  const isEditing: boolean = useGetIsEditing(data);
  const isOutermost: boolean = getIsOutermost(data);

  return (
    <Stack
      mt={isOutermost ? 2 : 0}
      spacing={1}
      sx={{ width: '100%', display: 'flex', alignItems: 'flex-end' }}
    >
      <Stack direction='row' spacing={1}>
        {isOutermost && (
          <Stack sx={{ display: 'flex', justifyContent: 'center' }}>
            <CompletedButton data={data} />
          </Stack>
        )}
        <Stack
          direction='row'
          spacing={1}
          sx={{ width: isEditing ? '100%' : null, display: 'flex', alignItems: 'flex-end' }}
        >
          <Stack spacing={0.2} sx={{ display: 'flex', alignItems: 'flex-end' }}>
            <EditedMark data={data} />
            <Stack direction='row' spacing={0.5}>
              <SynchronizedMark data={data} />
              <HoursChip data={data} />
            </Stack>
          </Stack>
          <Stack spacing={1} sx={{ width: isEditing ? '100%' : null }}>
            <Stack sx={{ display: 'flex', alignItems: 'flex-end' }}>
              <ChatCard data={data}>{children}</ChatCard>
            </Stack>
          </Stack>
        </Stack>
      </Stack>
      {isOutermost && <LowerButtons data={data} />}
    </Stack>
  );
};
