import { useEffect, useState } from 'react';

import { useRecoilValue, useRecoilState } from 'recoil';

import Collapse from '@mui/material/Collapse';

import { TransitionGroup } from 'react-transition-group';

import { useCreateTimelineProps } from '../hooks/useCreateTimelineProps';
import { useScrollManager } from '../hooks/useScrollManager';
import { changeMemoState } from '../states/changeMemoState';
import { isLogginginState } from '../states/isLogginginState';
import { isLoggingoutState } from '../states/isLoggingoutState';
import { Memo } from '../states/memoState';
import { Comment } from '../states/memoState';
import { openSideDrawerState } from '../states/openSideDrawerState';
import { openUserMenuState } from '../states/openUserMenuState';
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

export const Timeline = (props: TimelineProps) => {
  const { data } = props;

  const openSideDrawer = useRecoilValue(openSideDrawerState);
  const [_openSideDrawer, _setOpenSideDrawer] = useState(false);
  const openUserMenu = useRecoilValue(openUserMenuState);
  const [isLoggingout, setIsLoggingout] = useRecoilState(isLoggingoutState);
  const [isLoggingin, setIsLoggingin] = useRecoilState(isLogginginState);

  const changeMemo = useRecoilValue(changeMemoState);

  const createProps = useCreateTimelineProps();

  useScrollManager(data);

  useEffect(() => {
    setIsLoggingout(false);
    setIsLoggingin(false);
  }, [changeMemo, setIsLoggingout, setIsLoggingin]);

  useEffect(() => {
    // openSideDrawerをfalseにするのをTimelineコンポーネントレンダリング後にするため
    // これがないと、useScrollManagerのinitializeClientHeightで正しい高さが取得できない
    _setOpenSideDrawer(openSideDrawer);
  }, [openSideDrawer]);

  return (
    <>
      <TimelineWrapper>
        <Loading />
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
              exit={!_openSideDrawer && !openUserMenu && !isLoggingout && !isLoggingin}
            >
              {memo._type === 'memo' && <ChatMemo key={memo._id} {...createProps(memo)} />}
              {memo._type === 'date' && <DateChip date={memo._date} />}
            </Collapse>
          ))}
        </TransitionGroup>
      </TimelineWrapper>
    </>
  );
};
