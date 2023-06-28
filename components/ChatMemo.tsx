import { memo } from 'react';

import { ChatComment } from './ChatComment';
import { ChatPack } from './ChatPack';
import { DateChip } from './DateChip';
import { InternalData } from './Timeline';
import { DelayCompleted } from '../components/DelayCompletedContext';
import { AlertDialog } from '../states/displayAlertDialogState';
import { Comment } from '../states/memoState';
import { convertInternalDataToComment } from '../utils/convertInternalDataToComment';

export interface ChatMemoProps {
  data: InternalData;
  isAddingContents: boolean;
  isEditingContents: boolean;
  isTrash: boolean;
  isAllMemo: boolean;
  delayCompleted: DelayCompleted | undefined;
  memoBackground: string;
  commentBackground: string;
  changeAddingContentID: (id: string) => void;
  changeDisplayAlertDialog: (value: AlertDialog, deleteID?: string | undefined) => void;
  changeEditingContentID: (id: string) => void;
  deleteMemo: (id: string | undefined) => Promise<void>;
  revertMemo: (id: string | undefined) => Promise<void>;
  updateServerCompleted: (id: string, value: boolean, date?: string | undefined) => Promise<void>;
  createEditingInfo: (data: InternalData) => void;
}

/**
 * @return 再レンダリングの有無を返す（true:レンダリングしない、false:レンダリングする）
 */
const isEqual = (
  prevProps: Readonly<ChatMemoProps>,
  nextProps: Readonly<ChatMemoProps>,
): boolean => {
  // 表示する値に変更がないときは、再レンダリングしない

  const arrayCompare = (array1: string[], array2: string[]) => {
    if (array1.length !== array2.length) {
      return false;
    }
    return array1.every((value, index) => value === array2[index]);
  };

  const commentCompare = (array1: Comment[] | undefined, array2: Comment[] | undefined) => {
    if (array1 === undefined && array2 === undefined) {
      return true;
    } else if (array1 === undefined || array2 === undefined) {
      return false;
    }

    if (array1.length !== array2.length) {
      return false;
    }

    return array1.every(
      (value, index) =>
        value._id === array2[index]._id &&
        value.body === array2[index].body &&
        arrayCompare(value._text, array2[index]._text) &&
        value.createdAt === array2[index].createdAt &&
        value.updatedAt === array2[index].updatedAt &&
        value._date === array2[index]._date &&
        value._time === array2[index]._time &&
        value._synchronized === array2[index]._synchronized,
    );
  };

  return (
    prevProps.data.id === nextProps.data.id &&
    prevProps.data.body === nextProps.data.body &&
    arrayCompare(prevProps.data.text, nextProps.data.text) &&
    prevProps.data.createdAt === nextProps.data.createdAt &&
    prevProps.data.updatedAt === nextProps.data.updatedAt &&
    prevProps.data.completed === nextProps.data.completed &&
    prevProps.data.date === nextProps.data.date &&
    prevProps.data.time === nextProps.data.time &&
    prevProps.data.synchronized === nextProps.data.synchronized &&
    commentCompare(prevProps.data.comments, nextProps.data.comments) &&
    prevProps.isAddingContents === nextProps.isAddingContents &&
    prevProps.isEditingContents === nextProps.isEditingContents &&
    prevProps.isTrash === nextProps.isTrash &&
    prevProps.isAllMemo === nextProps.isAllMemo &&
    prevProps.memoBackground === nextProps.memoBackground &&
    prevProps.commentBackground === nextProps.commentBackground
  );
};

export const ChatMemo = memo(function ChatMemo(props: ChatMemoProps) {
  const { data } = props;

  return (
    <ChatPack {...props} isOutermost={true}>
      {data.comments &&
        data.comments.map((c, index) => (
          <div key={index}>
            {c._type === 'comment' && (
              <ChatComment {...props} data={convertInternalDataToComment(c)} />
            )}
            {c._type === 'date' && <DateChip date={c._date} />}
          </div>
        ))}
    </ChatPack>
  );
}, isEqual);
