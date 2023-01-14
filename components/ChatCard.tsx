import Card from '@mui/material/Card';

import { CommentText } from './CommentText';
import { CommonTextField } from './CommonTextField';
import { EditCompleteButton } from './EditCompleteButton';
import { EditingInfo } from './EditingInfoContext';
import { MemoText } from './MemoText';
import { InternalData } from './Timeline';

interface ChatCardProps {
  data: InternalData;
  children?: any;
  isAddingContents: boolean;
  isEditingContents: boolean;
  editingInfo: EditingInfo | undefined;
  memoBackground: string;
  commentBackground: string;
  isOutermost: boolean;
}

export const ChatCard = (props: ChatCardProps) => {
  const {
    data,
    isAddingContents,
    isEditingContents,
    editingInfo,
    children,
    memoBackground,
    commentBackground,
    isOutermost,
  } = props;

  const isSelected: boolean = (isOutermost && isAddingContents) || isEditingContents;

  const handleClick = () => {
    // コメント追加中にチャット部分をクリックしても入力エリアからフォーカスが外れないようにする
    if (isAddingContents) {
      document.getElementById('input')?.focus();
    }
  };

  const Texts = () => {
    return isEditingContents ? (
      <CommonTextField data={data} editingInfo={editingInfo} />
    ) : isOutermost ? (
      <MemoText data={data.text} memoBackground={memoBackground} />
    ) : (
      <CommentText data={data.text} />
    );
  };

  return (
    <>
      {isEditingContents && !isOutermost ? (
        <Texts />
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
            width: isEditingContents ? '100%' : null,
          }}
          onClick={handleClick}
        >
          <Texts />
          {children}
          {isEditingContents && isOutermost && <EditCompleteButton editingInfo={editingInfo} />}
        </Card>
      )}
    </>
  );
};
