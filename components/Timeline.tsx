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
import { useEffect } from 'react';
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
import { useOperateRevertMemo } from '../hooks/useOperateRevertMemo';
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

const useGetIsAddingContents = () => {
  const addingContentID = useRecoilValue(addingContentIDState);

  return (id: string): boolean => {
    return id === addingContentID;
  };
};

const useGetIsEditingContents = () => {
  const editingContentID = useRecoilValue(editingContentIDState);
  return (id: string) => {
    return id === editingContentID;
  };
};

export default function Timeline(props: TimelineProps) {
  const { data } = props;
  const getIsAddingContents = useGetIsAddingContents();
  const getIsEditingContents = useGetIsEditingContents();
  const selectedDisplayType = useRecoilValue(selectedDisplayTypeState);
  const getIsTrash = selectedDisplayType.id === 3;
  const getIsAllMemo = selectedDisplayType.id === 1;
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
  const revertMemo = useOperateRevertMemo();
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
                revertMemo={revertMemo}
                updateServerCompleted={updateServerCompleted}
              />
            )}
            {memo._type === 'date' && <DateChip date={memo._date} />}
          </Collapse>
        ))}
      </TransitionGroup>
    </TimelineWrapper>
  );
}
