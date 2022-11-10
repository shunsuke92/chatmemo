import Card from '@mui/material/Card';
import { useOperationContext } from './OperationContext';
import { useMemoBackground, useCommentBackground } from '../hooks/useColor';
import { InternalData, useGetIsEditing, getIsOutermost, useGetIsAdding } from './Timeline';
import { CommonTextField } from './CommonTextField';
import { MemoText } from './MemoText';
import { CommentText } from './CommentText';
import { EditCompleteButton } from './EditCompleteButton';

interface ChatCardProps {
  data: InternalData;
  children?: any;
}

export const ChatCard = (props: ChatCardProps) => {
  const { data, children } = props;

  const info = useOperationContext();
  const memoBackground = useMemoBackground();
  const commentBackground = useCommentBackground();

  const isOutermost: boolean = getIsOutermost(data);
  const isAdding: boolean = useGetIsAdding(data);
  const isEditing: boolean = useGetIsEditing(data);
  const isSelected: boolean = isAdding || isEditing;

  const handleClick = () => {
    // コメント追加中にチャット部分をクリックしても入力エリアからフォーカスが外れないようにする
    if (info?.addingContentID !== undefined ? info?.addingContentID.length > 0 : false) {
      document.getElementById('input')?.focus();
    }
  };

  return (
    <>
      {isEditing && !isOutermost ? (
        isEditing ? (
          <CommonTextField data={data} />
        ) : isOutermost ? (
          <MemoText data={data.text} />
        ) : (
          <CommentText data={data.text} />
        )
      ) : (
        <Card
          sx={{
            bgcolor: isOutermost ? memoBackground : commentBackground,
            p: 1,
            borderRadius: 2,
            wordBreak: 'break-word',
            textAlign: 'left',
            boxShadow: 'none',
            border: isSelected ? '1px solid' : 'none',
            borderColor: (theme) => theme.palette.primary.main,
            zIndex: isSelected ? 2500 : null,
            width: isEditing ? '100%' : null,
          }}
          onClick={handleClick}
        >
          {isEditing ? (
            <CommonTextField data={data} />
          ) : isOutermost ? (
            <MemoText data={data.text} />
          ) : (
            <CommentText data={data.text} />
          )}
          {children}
          {isEditing && isOutermost && <EditCompleteButton />}
        </Card>
      )}
    </>
  );
};
