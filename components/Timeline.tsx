import Collapse from '@mui/material/Collapse';

import { TransitionGroup } from 'react-transition-group';

import { Chat } from './Chat';
import { DateChip } from './DateChip';
import { Loading } from './Loading';
import { TimelineWrapper } from './TimelineWrapper';
import { useCreateTimelineProps } from '../hooks/useCreateTimelineProps';
import { useGetIsExitAnimation } from '../hooks/useGetIsExitAnimation';
import { useScrollManager } from '../hooks/useScrollManager';
import { Memo, Comment } from '../types/index';

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

  useScrollManager(data);
  const createProps = useCreateTimelineProps();
  const isExitAnimation = useGetIsExitAnimation();

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
              exit={isExitAnimation}
            >
              {memo._type === 'memo' && <Chat {...createProps(memo)} />}
              {memo._type === 'date' && <DateChip date={memo._date} />}
            </Collapse>
          ))}
        </TransitionGroup>
      </TimelineWrapper>
    </>
  );
};
