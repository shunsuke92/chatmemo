import { Memo } from './DataContext';
import { Operation } from './OperationContext';
import { ChatPack } from './ChatPack';
import { ChatComment } from './ChatComment';
import { DateChip } from './DateChip';
import { InternalData } from './Timeline';
import { memo } from 'react';

interface ChatMemoProps {
  data: Memo;
  info: Operation | null;
}

/**
 * @return 再レンダリングの有無を返す（true:レンダリングしない、false:レンダリングする）
 */
const isEqual = (
  prevProps: Readonly<ChatMemoProps>,
  nextProps: Readonly<ChatMemoProps>,
): boolean => {
  // 表示する値に変更がないときは、再レンダリングしない

  return (
    prevProps.data._id === nextProps.data._id &&
    prevProps.data._text === nextProps.data._text &&
    prevProps.data.createdAt === nextProps.data.createdAt &&
    prevProps.data.updatedAt === nextProps.data.updatedAt &&
    prevProps.data._date === nextProps.data._date &&
    prevProps.data._time === nextProps.data._time &&
    prevProps.data._time === nextProps.data._time &&
    prevProps.data._synchronized === nextProps.data._synchronized &&
    prevProps.data._tmpCompleted === nextProps.data._tmpCompleted
  );
};

export const ChatMemo = memo(function ChatMemo(props: ChatMemoProps) {
  const { data } = props;

  const displayMemo: InternalData = {
    type: 'memo',
    id: data._id,
    text: data._text,
    createdAt: data.createdAt,
    updatedAt: data.updatedAt,
    date: data._date,
    time: data._time,
    synchronized: data._synchronized,
    completed: data._tmpCompleted,
  };

  return (
    <ChatPack data={displayMemo}>
      {data.comments.map((c, index) => (
        <div key={index}>
          {c._type === 'comment' && <ChatComment data={c} memoID={data._id} />}
          {c._type === 'date' && <DateChip date={c._date} />}
        </div>
      ))}
    </ChatPack>
  );
}, isEqual);
