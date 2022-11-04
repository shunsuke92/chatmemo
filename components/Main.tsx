import Typography from '@mui/material/Typography';
import { Box } from '@mui/system';
import Stack from '@mui/material/Stack';
import Card from '@mui/material/Card';
import Chip from '@mui/material/Chip';
import IconButton from '@mui/material/IconButton';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Memo, Comment, useDataContext } from './DataContext';
import { useOperationContext } from './OperationContext';
import { useSettingInfoContext } from './SettingInfoContext';
import { useEditingInfoContext } from './EditingInfoContext';
import { useState, useEffect } from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Tooltip from '@mui/material/Tooltip';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { TransitionGroup } from 'react-transition-group';
import Collapse from '@mui/material/Collapse';
import EditIcon from '@mui/icons-material/Edit';
import { useMemoBackground, useCommentBackground } from '../hooks/useColor';
import { useCreateDisplayData } from '../hooks/useCreateDisplayData';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import RadioButtonCheckedIcon from '@mui/icons-material/RadioButtonChecked';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import AddCommentIcon from '@mui/icons-material/AddComment';

interface ChatMemoProps {
  data: Memo;
}

interface ChatCommentProps {
  data: Comment;
  memoID: string;
}

interface ChatPackProps {
  data: InternalData;
  children?: any;
}

interface InternalData {
  type: 'memo' | 'comment';
  id: string;
  memoID?: string;
  text: string[];
  createdAt: string;
  updatedAt: string;
  date: string;
  time: string;
  synchronized: boolean;
}

interface ChatTextProps {
  data: string[];
}

interface InternalDataProps {
  data: InternalData;
}

interface HoursChipProps {
  data: InternalData;
}

const getIsOutermost = (data: InternalData): boolean => {
  return data.type === 'memo';
};

const useGetIsTrash = (): boolean => {
  const info = useOperationContext();

  return info?.selectedDisplayType.id === 3;
};

const useGetIsAdding = (data: InternalData): boolean => {
  const info = useOperationContext();

  return data.type === 'memo' && data.id === info?.addingContentID;
};

const useGetIsEditing = (data: InternalData): boolean => {
  const info = useOperationContext();

  return data.type === 'memo'
    ? data.id === info?.editingContentID
    : data.memoID === info?.editingContentID;
};

export default function Main() {
  const info = useOperationContext();

  useEffect(() => {
    const isScrolling = info?.scheduledScrolling ?? false;
    info?.changeScheduledScrolling(false);
    if (!isScrolling) return;

    // 最下部までスクロール
    const element = document.documentElement;
    const bottom = element.scrollHeight - element.clientHeight;
    window.scroll(0, bottom);

    // 最下部までのスクロールのあとで、html要素にscrollBehaviorを追加する
    const html = document.getElementById('html');
    if (html !== null) {
      html.style.scrollBehavior = 'smooth';
    }
  });

  return (
    <Box
      sx={{
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'center',
      }}
    >
      <Box
        sx={{
          width: '100%',
          maxWidth: 600,
          height: '100%',
          pt: 2,
          pb: 2,
          pr: 3,
          pl: 3,
        }}
      >
        <Timeline />
      </Box>
    </Box>
  );
}

const Timeline = () => {
  const displayData = useCreateDisplayData();

  return (
    <Stack
      spacing={2}
      sx={{
        display: 'flex',
        alignItems: 'flex-end',
        width: '100%',
      }}
    >
      <TransitionGroup
        style={{
          width: '100%',
        }}
      >
        {displayData.map((d) => (
          <Collapse key={d._type === 'memo' ? d._id : d._date} timeout={400} enter={false}>
            {d._type === 'memo' && <ChatMemo data={d} />}
            {d._type === 'date' && <DateChip date={d._date} />}
          </Collapse>
        ))}
      </TransitionGroup>
    </Stack>
  );
};

const DateChip = (props: { date: string }) => {
  const { date } = props;

  return (
    <>
      {
        <Stack
          spacing={2}
          pt={1}
          sx={{ width: '100%', maxWidth: '100%', display: 'flex', alignItems: 'center' }}
        >
          <Chip
            label={date}
            size='small'
            sx={{
              maxWidth: '100%',
              display: 'flex',
              alignItems: 'center',
              color: 'text.disabled',
            }}
          />
        </Stack>
      }
    </>
  );
};

const ChatMemo = (props: ChatMemoProps) => {
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
};

const ChatComment = (props: ChatCommentProps) => {
  const { data, memoID } = props;

  const displayComment: InternalData = {
    type: 'comment',
    id: data._id,
    memoID: memoID,
    text: data._text,
    createdAt: data.createdAt,
    updatedAt: data.updatedAt,
    date: data._date,
    time: data._time,
    synchronized: data._synchronized,
  };

  return (
    <Stack spacing={1} sx={{ pt: 1, display: 'flex', alignItems: 'flex-end', maxWidth: '100%' }}>
      <ChatPack data={displayComment} />
    </Stack>
  );
};

const ChatPack = (props: ChatPackProps) => {
  const { data, children } = props;

  const isEditing: boolean = useGetIsEditing(data);
  const isOutermost: boolean = getIsOutermost(data);
  const isTrash = useGetIsTrash();

  return (
    <Stack
      mt={isOutermost ? 2 : 0}
      spacing={1}
      sx={{ width: '100%', display: 'flex', alignItems: 'flex-end' }}
    >
      <Stack direction='row' spacing={1}>
        {!isTrash && isOutermost && (
          <Stack sx={{ display: 'flex', justifyContent: 'center' }}>
            <CompletedButton data={data} />
          </Stack>
        )}
        <Stack
          direction='row'
          spacing={1}
          sx={{ width: isEditing ? '100%' : null, display: 'flex', alignItems: 'flex-end' }}
        >
          <Stack spacing={0.2} sx={{ display: 'flex', alignItems: 'flex-end' }}>
            <EditedMark data={data} />
            <Stack direction='row' spacing={0.5}>
              <SynchronizedMark data={data} />
              <HoursChip data={data} />
            </Stack>
          </Stack>
          <Stack spacing={1} sx={{ width: isEditing ? '100%' : null }}>
            <Stack sx={{ display: 'flex', alignItems: 'flex-end' }}>
              <ChatCard data={data}>{children}</ChatCard>
            </Stack>
          </Stack>
        </Stack>
      </Stack>
      {isOutermost && <LowerButtons data={data} />}
    </Stack>
  );
};

const ChatCard = (props: ChatPackProps) => {
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

const EditCompleteButton = () => {
  const info = useOperationContext();
  const editingInfo = useEditingInfoContext();

  const handleClickCancel = () => {
    info?.clearEditingContentID();
  };

  const handleClickSave = () => {
    editingInfo?.overwriteData();
    info?.clearEditingContentID();
  };

  return (
    <Stack spacing={1} direction='row' pt={2} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
      <Button variant='outlined' onClick={handleClickCancel}>
        キャンセル
      </Button>
      <Button variant='contained' onClick={handleClickSave} disabled={!editingInfo?.isChanged()}>
        保存
      </Button>
    </Stack>
  );
};

const CommonTextField = (props: InternalDataProps) => {
  const { data } = props;

  const editingInfo = useEditingInfoContext();

  const [value, setValue] = useState(data.text.join('\n'));

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);

    if (data.type === 'memo') {
      editingInfo?.updateEditingContentAfter(event.target.value);
    } else {
      editingInfo?.updateEditingContentAfter(event.target.value, data.id);
    }
  };

  return (
    <TextField
      value={value}
      variant='outlined'
      size='small'
      fullWidth
      multiline
      sx={{ width: '100%', maxWidth: '100%' }}
      onChange={handleChange}
    />
  );
};

const MemoText = (props: ChatTextProps) => {
  const { data } = props;

  const memoBackground = useMemoBackground();

  return (
    <>
      {data.map((text, index) => {
        if (text) {
          return (
            <Stack
              key={index}
              sx={{ display: 'flex', alignItems: index === 0 ? 'flex-end' : 'flex-start' }}
            >
              <Card
                sx={{
                  bgcolor: memoBackground,
                  p: 1,
                  borderRadius: 2,
                  display: 'inline-block',
                  width: 'fit-content',
                  wordBreak: 'break-word',
                  boxShadow: 'none',
                }}
              >
                <Typography key={index}>{text}</Typography>
              </Card>
            </Stack>
          );
        } else {
          return <br key={index}></br>;
        }
      })}
    </>
  );
};

const CommentText = (props: ChatTextProps) => {
  const { data } = props;

  return (
    <>
      {data.map((text, index) => {
        if (text) {
          return <Typography key={index}>{text}</Typography>;
        } else {
          return <br key={index}></br>;
        }
      })}
    </>
  );
};

const LowerButtons = (props: InternalDataProps) => {
  const { data } = props;

  const isTrash = useGetIsTrash();

  return (
    <Stack spacing={1} direction='row' justifyContent='space-between' alignItems='center'>
      {!isTrash && <AddCommentButton data={data} />}

      <MoreButton data={data} />
    </Stack>
  );
};

const CompletedButton = (props: InternalDataProps) => {
  const { data } = props;
  const displayData = useDataContext();
  const targetData = displayData?.getTargetMemo(data.id);

  const isCompleted = targetData?._tmpCompleted ?? false;

  function handleClick(id: string) {
    return function () {
      if (targetData === undefined) return;
      displayData?.updateServerCompleted(id);
      displayData?.updateLocalCompleted(id);
    };
  }

  return (
    <IconButton
      aria-label='completed'
      sx={{ color: 'text.secondary' }}
      onClick={handleClick(data.id)}
      size='small'
    >
      {isCompleted ? (
        <RadioButtonCheckedIcon fontSize='small' color='primary' />
      ) : (
        <RadioButtonUncheckedIcon fontSize='small' color='disabled' />
      )}
    </IconButton>
  );
};

const AddCommentButton = (props: InternalDataProps) => {
  const { data } = props;

  const info = useOperationContext();

  function handleClick(id: string) {
    return function () {
      if (info?.addingContentID === id) {
        info?.clearAddingContentID();
      } else {
        info?.changeAddingContentID(id);
      }
    };
  }

  return (
    <Tooltip title='コメントを追加'>
      <IconButton
        aria-label='add-comment'
        sx={{ color: 'text.secondary' }}
        onClick={handleClick(data.id)}
        size='small'
      >
        <AddCommentIcon fontSize='small' />
      </IconButton>
    </Tooltip>
  );
};

const MoreButton = (props: InternalDataProps) => {
  const { data } = props;

  const info = useOperationContext();
  const displayData = useDataContext();
  const editingInfo = useEditingInfoContext();
  const isTrash = useGetIsTrash();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const open = Boolean(anchorEl);

  function handleClickMore(event: React.MouseEvent<HTMLButtonElement>) {
    setAnchorEl(event.currentTarget);
  }

  const handleClose = () => {
    setAnchorEl(null);
  };

  function handleClickEdit(id: string) {
    return function () {
      if (info?.editingContentID === id) {
        info?.clearEditingContentID();
        editingInfo?.clearEditingContentInfo();
      } else {
        info?.changeEditingContentID(id);
        editingInfo?.createEditingContentInfo(id);
      }
      setAnchorEl(null);
    };
  }

  function handleClickDelete(id: string) {
    return function () {
      if (isTrash) {
        // 完全削除のダイアログを表示
        info?.changeDisplayAlertDialog('complete-deletion-memo', id);
      } else {
        // ごみ箱に移動
        displayData?.deleteMemo(id);
      }
      setAnchorEl(null);
    };
  }

  return (
    <>
      <IconButton
        aria-label='more'
        sx={{ color: 'text.secondary' }}
        onClick={handleClickMore}
        size='small'
      >
        <MoreVertIcon fontSize='small' />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        sx={{ mt: 1 }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        {!isTrash && (
          <MenuItem onClick={handleClickEdit(data.id)} sx={{ fontSize: '0.8rem' }}>
            編集
          </MenuItem>
        )}
        <MenuItem onClick={handleClickDelete(data.id)} sx={{ fontSize: '0.8rem' }}>
          削除
        </MenuItem>
      </Menu>
    </>
  );
};

const HoursChip = (props: HoursChipProps) => {
  const { data } = props;

  const settingInfo = useSettingInfoContext();
  const setting = settingInfo?.setting;

  const isDisplay = data.type === 'comment' ? setting?.display_comment_date : true;

  return (
    <>
      {isDisplay && (
        <Typography variant='caption' color='text.disabled' sx={{ whiteSpace: 'nowrap' }}>
          {data.time}
        </Typography>
      )}
    </>
  );
};

const EditedMark = (props: InternalDataProps) => {
  const { data } = props;

  const isEdited = data.createdAt !== data.updatedAt;
  const isEditing: boolean = useGetIsEditing(data);

  return <>{isEdited && !isEditing && <EditIcon color='disabled' sx={{ fontSize: 16 }} />}</>;
};

const SynchronizedMark = (props: InternalDataProps) => {
  const { data } = props;

  const isSynchronized = !data.synchronized;

  return (
    <>
      {isSynchronized && (
        <Tooltip title='通信エラー'>
          <ErrorOutlineIcon color='error' sx={{ fontSize: 18 }} />
        </Tooltip>
      )}
    </>
  );
};
