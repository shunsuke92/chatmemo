import Typography from '@mui/material/Typography';
import { Box } from '@mui/system';
import { SxProps, Theme } from '@mui/system';
import Stack from '@mui/material/Stack';
import Card from '@mui/material/Card';
import Chip from '@mui/material/Chip';
import IconButton from '@mui/material/IconButton';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CommentIcon from '@mui/icons-material/Comment';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Memo, useDataContext } from '../components/DataContext';
import { Operation, useOperationContext } from './OperationContext';
import { useSettingInfoContext } from '../components/SettingInfoContext';
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

interface ChatProps {
  data: Memo;
}

interface ChatPackProps {
  data: InternalData;
  children?: any;
}

interface InternalData {
  type: 'memo' | 'comment';
  id: number;
  memoID?: number;
  text: string[];
  createdAt: string;
  updatedAt: string;
  date: string;
  time: string;
  isDateDisplay: boolean;
}

interface ChatTextProps {
  data: string[];
}

interface InternalDataProps {
  data: InternalData;
}

interface HoursProps {
  data: InternalData;
  sx: SxProps<Theme>;
}

export default function Timeline() {
  const info = useOperationContext();
  const settingInfo = useSettingInfoContext();
  const setting = settingInfo?.setting;

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

  const Chat = () => {
    const globalData = useDataContext();

    const data: Memo[] =
      info?.selectedDisplayType.id === 1 && !setting?.hide_completed_memo
        ? globalData?.data
            .filter((d) => !d.deleted)
            .map((d) => {
              d.comments = d.comments.filter((d) => !d.deleted);
              return d;
            }) ?? []
        : info?.selectedDisplayType.id === 1 && setting?.hide_completed_memo
        ? globalData?.data
            .filter((d) => !d.deleted && !d.completed)
            .map((d) => {
              d.comments = d.comments.filter((d) => !d.deleted);
              return d;
            }) ?? []
        : info?.selectedDisplayType.id === 2
        ? globalData?.data
            .filter((d) => !d.deleted && d.completed)
            .map((d) => {
              d.comments = d.comments.filter((d) => !d.deleted);
              return d;
            }) ?? []
        : info?.selectedDisplayType.id === 3
        ? globalData?.data
            .filter((d) => d.deleted)
            .map((d) => {
              d.comments = d.comments.filter((d) => !d.deleted);
              return d;
            }) ?? []
        : [];

    const chatData = data.map((d, index) => {
      if (index === 0) {
        d._isDateDisplay = true;
      } else if (d._date !== data[index - 1]._date) {
        d._isDateDisplay = true;
      } else {
        d._isDateDisplay = false;
      }
      d.comments = d.comments.map((c, index) => {
        if (index === 0 && c._date !== d._date) {
          c._isDateDisplay = true;
        } else if (index !== 0 && c._date !== d.comments[index - 1]._date) {
          c._isDateDisplay = true;
        } else {
          c._isDateDisplay = false;
        }
        return c;
      });

      return d;
    });

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
          {chatData.map((d) => (
            <Collapse key={d.id} timeout={400} enter={false}>
              <DisplayMemo data={d} />
            </Collapse>
          ))}
        </TransitionGroup>
      </Stack>
    );
  };

  const DisplayMemo = (props: ChatProps) => {
    const { data } = props;

    // メモを抽出
    const memo: InternalData = {
      type: 'memo',
      id: data.id,
      text: data._text,
      createdAt: data.createdAt,
      updatedAt: data.updatedAt,
      date: data._date,
      time: data._time,
      isDateDisplay: data._isDateDisplay,
    };

    return (
      <ChatPack data={memo}>
        <DisplayComment data={data} />
      </ChatPack>
    );
  };

  const DisplayComment = (props: ChatProps) => {
    const { data } = props;

    // コメントを抽出
    let comments: InternalData[] = [];
    for (let i = 0; i < data.comments.length; i++) {
      const comment: InternalData = {
        type: 'comment',
        id: data.comments[i].id,
        memoID: data.id,
        text: data.comments[i]._text,
        createdAt: data.comments[i].createdAt,
        updatedAt: data.comments[i].updatedAt,
        date: data.comments[i]._date,
        time: data.comments[i]._time,
        isDateDisplay: data.comments[i]._isDateDisplay,
      };
      comments.push(comment);
    }

    return (
      <>
        {comments.length > 0 && (
          <Stack
            spacing={1}
            sx={{ pt: 1, display: 'flex', alignItems: 'flex-end', maxWidth: '100%' }}
          >
            {comments.map((comment, index) => {
              return <ChatPack key={index} data={comment} />;
            })}
          </Stack>
        )}
      </>
    );
  };

  const getIsOutermost = (data: InternalData): boolean => {
    return data.type === 'memo';
  };

  const getIsAdding = (data: InternalData, info: Operation): boolean => {
    return data.type === 'memo' && data.id === info.addingContentID;
  };

  const getIsEditing = (data: InternalData, info: Operation): boolean => {
    return data.type === 'memo'
      ? data.id === info.editingContentID
      : data.memoID === info.editingContentID;
  };

  const ChatPack = (props: ChatPackProps) => {
    const { data, children } = props;

    const isEditing: boolean = info !== null ? getIsEditing(data, info) : false;
    const isOutermost: boolean = getIsOutermost(data);

    return (
      <Stack
        mt={isOutermost ? 2 : 0}
        spacing={1}
        sx={{ width: '100%', display: 'flex', alignItems: 'flex-end' }}
      >
        <DateChip data={data} />
        <Stack
          direction='row'
          spacing={1}
          sx={{ width: isEditing ? '100%' : null, display: 'flex', alignItems: 'flex-end' }}
        >
          <Stack spacing={0.2} sx={{ display: 'flex', alignItems: 'flex-end' }}>
            <EditedMark data={data} />
            <Hours data={data} sx={{ pb: isOutermost ? 5 : 0 }} />
          </Stack>
          <Stack spacing={1} sx={{ width: isEditing ? '100%' : null }}>
            <Stack sx={{ display: 'flex', alignItems: 'flex-end' }}>
              <ChatCard data={data}>{children}</ChatCard>
            </Stack>
            {isOutermost && <Buttons data={data} />}
          </Stack>
        </Stack>
      </Stack>
    );
  };

  const ChatCard = (props: ChatPackProps) => {
    const { data, children } = props;

    const memoBackground = useMemoBackground();
    const commentBackground = useCommentBackground();

    const isOutermost: boolean = getIsOutermost(data);
    const isAdding: boolean = info !== null ? getIsAdding(data, info) : false;
    const isEditing: boolean = info !== null ? getIsEditing(data, info) : false;
    const isSelected: boolean = isAdding || isEditing;

    const handleClick = () => {
      // コメント追加中にチャット部分をクリックしても入力エリアからフォーカスが外れないようにする
      if (info?.addingContentID !== undefined ? info?.addingContentID > 0 : false) {
        document.getElementById('input')?.focus();
      }
    };

    return (
      <>
        {isEditing && !isOutermost ? (
          isEditing ? (
            <ChatTextField data={data} />
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
              <ChatTextField data={data} />
            ) : isOutermost ? (
              <MemoText data={data.text} />
            ) : (
              <CommentText data={data.text} />
            )}
            {children}
            {isEditing && isOutermost && <EditButton />}
          </Card>
        )}
      </>
    );
  };

  const EditButton = () => {
    const tempData = useEditingInfoContext();

    const handleClickCancel = () => {
      info?.changeEditingContentID(0);
    };

    const handleClickSave = () => {
      tempData?.overwriteData();
      info?.changeEditingContentID(0);
    };

    return (
      <Stack
        spacing={1}
        direction='row'
        pt={2}
        sx={{ display: 'flex', justifyContent: 'flex-end' }}
      >
        <Button variant='outlined' onClick={handleClickCancel}>
          キャンセル
        </Button>
        <Button variant='contained' onClick={handleClickSave} disabled={!tempData?.isChanged()}>
          保存
        </Button>
      </Stack>
    );
  };

  const MemoText = (props: ChatTextProps) => {
    const memoBackground = useMemoBackground();

    const { data } = props;
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

  const ChatTextField = (props: InternalDataProps) => {
    const { data } = props;
    const tempData = useEditingInfoContext();

    const [value, setValue] = useState(data.text.join('\n'));

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setValue(event.target.value);

      if (data.type === 'memo') {
        tempData?.updateEditingContentAfter(-1, event.target.value);
      } else {
        tempData?.updateEditingContentAfter(data.id, event.target.value);
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

  const Buttons = (props: InternalDataProps) => {
    const { data } = props;
    const globalData = useDataContext();
    const tempData = useEditingInfoContext();

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    const nowData = globalData?.data.find((d) => d.id === data.id);
    const isCompleted = nowData !== undefined ? nowData.completed : false;

    function handleClickCompleted(id: number) {
      return function () {
        globalData?.updateCompleted(id);
      };
    }

    function handleClickAddComment(id: number) {
      return function () {
        if (info?.addingContentID === id) {
          info?.changeAddingContentID(0);
        } else {
          info?.changeAddingContentID(id);
        }
      };
    }

    function handleClickMore(event: React.MouseEvent<HTMLButtonElement>) {
      setAnchorEl(event.currentTarget);
    }

    const handleClose = () => {
      setAnchorEl(null);
    };

    function handleClickEdit(id: number) {
      return function () {
        if (info?.editingContentID === id) {
          info?.changeEditingContentID(0);
          tempData?.clearEditingContentInfo();
        } else {
          info?.changeEditingContentID(id);
          tempData?.createEditingContentInfo(id);
        }
        setAnchorEl(null);
      };
    }

    function handleClickDelete(id: number) {
      return function () {
        globalData?.deleteMemo(id);
        setAnchorEl(null);
      };
    }

    return (
      <Stack spacing={1} direction='row' justifyContent='space-between' alignItems='center'>
        <Stack>
          <Stack spacing={1} direction='row' justifyContent='flex-start' alignItems='center'>
            <Tooltip title={isCompleted ? '未完了' : '完了'}>
              <IconButton
                aria-label='completed'
                sx={{ color: 'text.secondary' }}
                onClick={handleClickCompleted(data.id)}
                size='small'
              >
                {isCompleted ? (
                  <CheckCircleIcon fontSize='small' />
                ) : (
                  <CheckCircleOutlineIcon fontSize='small' />
                )}
              </IconButton>
            </Tooltip>
            <Tooltip title='コメント'>
              <IconButton
                aria-label='add-comment'
                sx={{ color: 'text.secondary' }}
                onClick={handleClickAddComment(data.id)}
                size='small'
              >
                <CommentIcon fontSize='small' />
              </IconButton>
            </Tooltip>
          </Stack>
        </Stack>
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
          <MenuItem onClick={handleClickEdit(data.id)} sx={{ fontSize: '0.8rem' }}>
            編集
          </MenuItem>
          <MenuItem onClick={handleClickDelete(data.id)} sx={{ fontSize: '0.8rem' }}>
            削除
          </MenuItem>
        </Menu>
      </Stack>
    );
  };

  const DateChip = (props: InternalDataProps) => {
    const settingInfo = useSettingInfoContext();
    const setting = settingInfo?.setting;

    const { data } = props;

    const date = data.date;
    const isDisplay =
      data.isDateDisplay && (data.type === 'comment' ? setting?.display_comment_date : true);

    return (
      <>
        {isDisplay && (
          <Stack
            spacing={2}
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
        )}
      </>
    );
  };

  const Hours = (props: HoursProps) => {
    const settingInfo = useSettingInfoContext();
    const setting = settingInfo?.setting;

    const { data, sx } = props;

    const isDisplay = data.type === 'comment' ? setting?.display_comment_date : true;

    return (
      <>
        {isDisplay && (
          <Typography variant='caption' color='text.disabled' sx={{ ...sx, whiteSpace: 'nowrap' }}>
            {data.time}
          </Typography>
        )}
      </>
    );
  };

  const EditedMark = (props: InternalDataProps) => {
    const { data } = props;
    const isEdited = data.createdAt !== data.updatedAt;
    const isEditing: boolean = info !== null ? getIsEditing(data, info) : false;

    return <>{isEdited && !isEditing && <EditIcon color='disabled' sx={{ fontSize: 16 }} />}</>;
  };

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
        <Chat />
      </Box>
    </Box>
  );
}
