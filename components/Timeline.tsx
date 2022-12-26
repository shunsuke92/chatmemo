import { TransitionGroup } from 'react-transition-group';
import Collapse from '@mui/material/Collapse';
import { DateChip } from './DateChip';
import { ChatMemo } from './ChatMemo';
import TimelineWrapper from './TimelineWrapper';
import { Comment } from '../states/memoState';
import { useRecoilValue, useRecoilState } from 'recoil';
import { selectedDisplayTypeState } from '../states/selectedDisplayTypeState';
import { addingContentIDState } from '../states/addingContentIDState';
import { editingContentIDState } from '../states/editingContentIDState';
import { Memo } from '../states/memoState';
import { useEditingInfoContext } from './EditingInfoContext';
import { useDelayCompletedContext } from '../components/DelayCompletedContext';
import { useEffect, useRef } from 'react';
import { openSideDrawerState } from '../states/openSideDrawerState';
import { openUserMenuState } from '../states/openUserMenuState';
import { isLoggingoutState } from '../states/isLoggingoutState';
import { authUserState } from '../states/authUserState';
import { useMemoBackground, useCommentBackground } from '../hooks/useColor';
import { useChangeAddingContentID } from '../hooks/useChangeAddingContentID';
import { useChangeDisplayAlertDialog } from '../hooks/useChangeDisplayAlertDialog';
import { useChangeEditingContentID } from '../hooks/useChangeEditingContentID';
import { convertInternalDataToMemo } from '../utils/convertInternalDataToMemo';
import { useOperateDeleteMemo } from '../hooks/useOperateDeleteMemo';
import { useOperateUpdateServerCompleted } from '../hooks/useOperateUpdateServerCompleted';

export interface InternalData {
  type: 'memo' | 'comment';
  id: string;
  memoID?: string;
  body: string;
  text: string[];
  createdAt: string;
  updatedAt: string;
  date: string;
  time: string;
  synchronized: boolean;
  completed?: boolean;
  comments?: Comment[];
}

interface TimelineProps {
  data: Memo[];
}

export const useGetIsTrashNext = () => {
  const selectedDisplayType = useRecoilValue(selectedDisplayTypeState);

  return selectedDisplayType.id === 3;
};

export const useGetIsAllMemoNext = () => {
  const selectedDisplayType = useRecoilValue(selectedDisplayTypeState);

  return selectedDisplayType.id === 1;
};

export const useGetIsAddingContentsNext = () => {
  const addingContentID = useRecoilValue(addingContentIDState);

  return (id: string): boolean => {
    return id === addingContentID;
  };
};

export const useGetIsEditingContentsNext = () => {
  const editingContentID = useRecoilValue(editingContentIDState);
  return (id: string) => {
    return id === editingContentID;
  };
};

export const Timeline = (props: TimelineProps) => {
  const { data } = props;
  const getIsAddingContents = useGetIsAddingContentsNext();
  const getIsEditingContents = useGetIsEditingContentsNext();
  const getIsTrash = useGetIsTrashNext();
  const getIsAllMemo = useGetIsAllMemoNext();
  const editingInfo = useEditingInfoContext();
  const delayCompleted = useDelayCompletedContext();
  const openSideDrawer = useRecoilValue(openSideDrawerState);
  const openUserMenu = useRecoilValue(openUserMenuState);
  const [isLoggingout, setIsLoggingout] = useRecoilState(isLoggingoutState);
  const user = useRecoilValue(authUserState);
  const memoBackground = useMemoBackground();
  const commentBackground = useCommentBackground();
  const changeAddingContentID = useChangeAddingContentID();
  const changeDisplayAlertDialog = useChangeDisplayAlertDialog();
  const changeEditingContentID = useChangeEditingContentID();
  const deleteMemo = useOperateDeleteMemo();
  const updateServerCompleted = useOperateUpdateServerCompleted();

  useEffect(() => {
    setIsLoggingout(false);
  }, [user, setIsLoggingout]);

  return (
    <TimelineWrapper>
      <TransitionGroup
        style={{
          width: '100%',
        }}
      >
        {data.map((memo) => (
          <Collapse
            key={memo._type === 'memo' ? memo._id : memo._date}
            timeout={400}
            enter={false}
            exit={!openSideDrawer && !openUserMenu && !isLoggingout}
          >
            {memo._type === 'memo' && (
              <ChatMemo
                key={memo._id}
                data={convertInternalDataToMemo(memo)}
                isAddingContents={getIsAddingContents(memo._id)}
                isEditingContents={getIsEditingContents(memo._id)}
                isTrash={getIsTrash}
                isAllMemo={getIsAllMemo}
                editingInfo={editingInfo}
                delayCompleted={delayCompleted}
                memoBackground={memoBackground}
                commentBackground={commentBackground}
                changeAddingContentID={changeAddingContentID}
                changeDisplayAlertDialog={changeDisplayAlertDialog}
                changeEditingContentID={changeEditingContentID}
                deleteMemo={deleteMemo}
                updateServerCompleted={updateServerCompleted}
              />
            )}
            {memo._type === 'date' && <DateChip date={memo._date} />}
          </Collapse>
        ))}
      </TransitionGroup>
    </TimelineWrapper>
  );
};
