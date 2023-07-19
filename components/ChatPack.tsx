import Stack from '@mui/material/Stack';

import { ChatProps } from './Chat';
import { ChatCard } from './ChatCard';
import { CompletedButton } from './CompletedButton';
import { HoursChip } from './HoursChip';
import { MoreButton } from './MoreButton';
import { SynchronizedMark } from './SynchronizedMark';

interface ChatPackProps extends ChatProps {
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
    delayCompleted,
    memoBackground,
    commentBackground,
    changeDisplayAlertDialog,
    deleteMemo,
    revertMemo,
    updateServerCompleted,
    isOutermost,
    createEditingInfo,
    children,
  } = props;

  return (
    <Stack
      mt={isOutermost ? 2 : 0}
      spacing={0.75}
      direction='row'
      alignItems='flex-start'
      justifyContent='flex-end'
      sx={{
        width: '100%',
      }}
      className={isOutermost ? `content${data.id}` : ''}
    >
      <Stack direction='row' spacing={1}>
        {isOutermost && (
          <Stack justifyContent='center'>
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
          alignItems='flex-end'
          sx={{ width: isEditingContents ? '100%' : null }}
        >
          <Stack spacing={0.2} alignItems='flex-end'>
            <Stack direction='row' spacing={0.5}>
              <SynchronizedMark data={data} />
              <HoursChip data={data} />
            </Stack>
          </Stack>
          <Stack spacing={1} sx={{ width: isEditingContents ? '100%' : null }}>
            <Stack alignItems='flex-end'>
              <ChatCard
                data={data}
                isAddingContents={isAddingContents}
                isEditingContents={isEditingContents}
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
        <MoreButton
          data={data}
          isTrash={isTrash}
          isAllMemo={isAllMemo}
          changeDisplayAlertDialog={changeDisplayAlertDialog}
          deleteMemo={deleteMemo}
          revertMemo={revertMemo}
          createEditingInfo={createEditingInfo}
        />
      )}
    </Stack>
  );
};
