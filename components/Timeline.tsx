import { useEffect } from 'react';

import { useRecoilValue, useRecoilState } from 'recoil';

import Collapse from '@mui/material/Collapse';

import { TransitionGroup } from 'react-transition-group';

import { useDelayCompletedContext } from '../components/DelayCompletedContext';
import { useChangeAddingContentID } from '../hooks/useChangeAddingContentID';
import { useChangeDisplayAlertDialog } from '../hooks/useChangeDisplayAlertDialog';
import { useChangeEditingContentID } from '../hooks/useChangeEditingContentID';
import { useMemoBackground, useCommentBackground } from '../hooks/useColor';
import { useCreateEditingInfo } from '../hooks/useCreateEditingInfo';
import { useOperateDeleteMemo } from '../hooks/useOperateDeleteMemo';
import { useOperateRevertMemo } from '../hooks/useOperateRevertMemo';
import { useOperateUpdateServerCompleted } from '../hooks/useOperateUpdateServerCompleted';
import { addingContentIDState } from '../states/addingContentIDState';
import { authUserState } from '../states/authUserState';
import { editingContentIDState } from '../states/editingContentIDState';
import { isLogginginState } from '../states/isLogginginState';
import { isLoggingoutState } from '../states/isLoggingoutState';
import { Memo } from '../states/memoState';
import { Comment } from '../states/memoState';
import { openSideDrawerState } from '../states/openSideDrawerState';
import { openUserMenuState } from '../states/openUserMenuState';
import { selectedDisplayTypeState } from '../states/selectedDisplayTypeState';
import { convertInternalDataToMemo } from '../utils/convertInternalDataToMemo';
import { ChatMemo } from './ChatMemo';
import { DateChip } from './DateChip';
import { Loading } from './Loading';
import { TimelineWrapper } from './TimelineWrapper';

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

export const Timeline = (props: TimelineProps) => {
  const { data } = props;
  const getIsAddingContents = useGetIsAddingContents();
  const getIsEditingContents = useGetIsEditingContents();
  const selectedDisplayType = useRecoilValue(selectedDisplayTypeState);
  const getIsTrash = selectedDisplayType.id === 3;
  const getIsAllMemo = selectedDisplayType.id === 1;
  const delayCompleted = useDelayCompletedContext();
  const openSideDrawer = useRecoilValue(openSideDrawerState);
  const openUserMenu = useRecoilValue(openUserMenuState);
  const [isLoggingout, setIsLoggingout] = useRecoilState(isLoggingoutState);
  const [isLoggingin, setIsLoggingin] = useRecoilState(isLogginginState);
  const user = useRecoilValue(authUserState);
  const memoBackground = useMemoBackground();
  const commentBackground = useCommentBackground();
  const changeAddingContentID = useChangeAddingContentID();
  const changeDisplayAlertDialog = useChangeDisplayAlertDialog();
  const changeEditingContentID = useChangeEditingContentID();
  const deleteMemo = useOperateDeleteMemo();
  const revertMemo = useOperateRevertMemo();
  const updateServerCompleted = useOperateUpdateServerCompleted();
  const createEditingInfo = useCreateEditingInfo();

  useEffect(() => {
    setIsLoggingout(false);
    setIsLoggingin(false);
  }, [user, setIsLoggingout, setIsLoggingin]);

  return (
    <>
      <Loading />
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
              exit={!openSideDrawer && !openUserMenu && !isLoggingout && !isLoggingin}
            >
              {memo._type === 'memo' && (
                <ChatMemo
                  key={memo._id}
                  data={convertInternalDataToMemo(memo)}
                  isAddingContents={getIsAddingContents(memo._id)}
                  isEditingContents={getIsEditingContents(memo._id)}
                  isTrash={getIsTrash}
                  isAllMemo={getIsAllMemo}
                  delayCompleted={delayCompleted}
                  memoBackground={memoBackground}
                  commentBackground={commentBackground}
                  changeAddingContentID={changeAddingContentID}
                  changeDisplayAlertDialog={changeDisplayAlertDialog}
                  changeEditingContentID={changeEditingContentID}
                  deleteMemo={deleteMemo}
                  revertMemo={revertMemo}
                  updateServerCompleted={updateServerCompleted}
                  createEditingInfo={createEditingInfo}
                />
              )}
              {memo._type === 'date' && <DateChip date={memo._date} />}
            </Collapse>
          ))}
        </TransitionGroup>
      </TimelineWrapper>
    </>
  );
};
