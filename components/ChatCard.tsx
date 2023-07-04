import Card from '@mui/material/Card';

import { AddCommentTextField } from './AddCommentTextField';
import { CommentText } from './CommentText';
import { CommonTextField } from './CommonTextField';
import { EditCompleteButton } from './EditCompleteButton';
import { MemoText } from './MemoText';
import { InternalData } from './Timeline';

interface ChatCardProps {
  data: InternalData;
  children?: any;
  isAddingContents: boolean;
  isEditingContents: boolean;
  memoBackground: string;
  commentBackground: string;
  isOutermost: boolean;
}

export const ChatCard = (props: ChatCardProps) => {
  const {
    data,
    isAddingContents,
    isEditingContents,
    children,
    memoBackground,
    commentBackground,
    isOutermost,
  } = props;

  const Texts = () => {
    return isEditingContents ? (
      <CommonTextField data={data} />
    ) : isOutermost ? (
      <MemoText data={data.text} memoBackground={memoBackground} />
    ) : (
      <CommentText data={data.text} />
    );
  };

  return (
    <>
      {isEditingContents ? (
        !isOutermost ? (
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
              borderColor: (theme) => theme.palette.primary.main,
              zIndex: 2500,
              width: '100%',
            }}
          >
            <Texts />
            {children}
            {isOutermost && <EditCompleteButton />}
          </Card>
        )
      ) : isAddingContents ? (
        <Card
          sx={{
            bgcolor: isOutermost ? memoBackground : commentBackground,
            p: 1,
            borderRadius: 2,
            wordBreak: 'break-word',
            textAlign: 'left',
            boxShadow: 'none',
            borderColor: (theme) => theme.palette.primary.main,
            zIndex: 2500,
          }}
        >
          <Texts />
          {children}
          {isOutermost && <AddCommentTextField data={data} />}
        </Card>
      ) : (
        <Card
          sx={{
            bgcolor: isOutermost ? memoBackground : commentBackground,
            p: 1,
            borderRadius: 2,
            wordBreak: 'break-word',
            textAlign: 'left',
            boxShadow: 'none',
            borderColor: (theme) => theme.palette.primary.main,
          }}
        >
          <Texts />
          {children}
        </Card>
      )}
    </>
  );
};
