import Stack from '@mui/material/Stack';

import { ChatMemoProps } from '../components/ChatMemo';
import { ChatCard } from './ChatCard';
import { CompletedButton } from './CompletedButton';
import { EditedMark } from './EditedMark';
import { HoursChip } from './HoursChip';
import { LowerButtons } from './LowerButtons';
import { SynchronizedMark } from './SynchronizedMark';

interface ChatPackProps extends ChatMemoProps {
  children?: any;
  isOutermost: boolean;
}

export const ChatPack = (props: ChatPackProps) => {
  const {
    data,
    isAddingContents,
    isEditingContents,
    isTrash,
    isAllMemo,
    editingInfo,
    delayCompleted,
    memoBackground,
    commentBackground,
    changeAddingContentID,
    changeDisplayAlertDialog,
    changeEditingContentID,
    deleteMemo,
    revertMemo,
    updateServerCompleted,
    isOutermost,
    children,
  } = props;

  return (
    <Stack
      mt={isOutermost ? 2 : 0}
      spacing={1}
      sx={{ width: '100%', display: 'flex', alignItems: 'flex-end' }}
      className={isOutermost ? `content${data.id}` : ''}
    >
      <Stack direction='row' spacing={1}>
        {isOutermost && (
          <Stack sx={{ display: 'flex', justifyContent: 'center' }}>
            <CompletedButton
              data={data}
              isTrash={isTrash}
              delayCompleted={delayCompleted}
              updateServerCompleted={updateServerCompleted}
            />
          </Stack>
        )}
        <Stack
          direction='row'
          spacing={1}
          sx={{ width: isEditingContents ? '100%' : null, display: 'flex', alignItems: 'flex-end' }}
        >
          <Stack spacing={0.2} sx={{ display: 'flex', alignItems: 'flex-end' }}>
            <EditedMark data={data} isEditingContents={isEditingContents} />
            <Stack direction='row' spacing={0.5}>
              <SynchronizedMark data={data} />
              <HoursChip data={data} />
            </Stack>
          </Stack>
          <Stack spacing={1} sx={{ width: isEditingContents ? '100%' : null }}>
            <Stack sx={{ display: 'flex', alignItems: 'flex-end' }}>
              <ChatCard
                data={data}
                isAddingContents={isAddingContents}
                isEditingContents={isEditingContents}
                editingInfo={editingInfo}
                memoBackground={memoBackground}
                commentBackground={commentBackground}
                isOutermost={isOutermost}
              >
                {children}
              </ChatCard>
            </Stack>
          </Stack>
        </Stack>
      </Stack>
      {isOutermost && (
        <LowerButtons
          data={data}
          isTrash={isTrash}
          isAllMemo={isAllMemo}
          editingInfo={editingInfo}
          changeAddingContentID={changeAddingContentID}
          changeDisplayAlertDialog={changeDisplayAlertDialog}
          changeEditingContentID={changeEditingContentID}
          deleteMemo={deleteMemo}
          revertMemo={revertMemo}
        />
      )}
    </Stack>
  );
};
