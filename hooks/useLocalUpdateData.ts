import { useSetRecoilState } from 'recoil';

import { displayingMemoState } from '../states/displayingMemoState';
import { memoState } from '../states/memoState';
import { Memo } from '../types/index';

export interface ChangeableMemo {
  body?: string;
  updatedAt?: string;
  completed?: boolean;
  completedAt?: string;
  deleted?: boolean;
  deletedAt?: string;
  _text?: string[];
  _synchronized?: boolean;
  _tmpCompleted?: boolean;
  _tmpCompletedAt?: string;
}

export interface ChangeableComment {
  body?: string;
  updatedAt?: string;
  deleted?: boolean;
  deletedAt?: string;
  _text?: string[];
  _synchronized?: boolean;
}

export const useLocalUpdateMemo = () => {
  const setMemo = useSetRecoilState(memoState);
  const setFilteredMemo = useSetRecoilState(displayingMemoState);

  const localUpdateMemo = (
    memoId: string,
    {
      body,
      updatedAt,
      completed,
      completedAt,
      deleted,
      deletedAt,
      _text,
      _synchronized,
      _tmpCompleted,
      _tmpCompletedAt,
    }: ChangeableMemo,
  ) => {
    const setData = (value: Memo): Memo => {
      if (value._id === memoId) {
        const setData = {
          ...value,
          body: body ?? value.body,
          updatedAt: updatedAt ?? value.updatedAt,
          completed: completed ?? value.completed,
          completedAt: completedAt ?? value.completedAt,
          deleted: deleted ?? value.deleted,
          deletedAt: deletedAt ?? value.deletedAt,
          _text: _text ?? value._text,
          _synchronized: _synchronized ?? value._synchronized,
          _tmpCompleted: _tmpCompleted ?? value._tmpCompleted,
          _tmpCompletedAt: _tmpCompletedAt ?? value._tmpCompletedAt,
        };
        return setData;
      }
      return value;
    };

    // オリジナルデータを更新
    setMemo((prevState) => prevState.map((value) => setData(value)));

    // 表示中のデータを更新
    setFilteredMemo((prevState) => prevState.map((value) => setData(value)));
  };
  return localUpdateMemo;
};

export interface LocalUpdateMemoProps {
  memoId: string;
  data: ChangeableMemo;
}

export const useLocalUpdateMemoMulti = () => {
  const setMemo = useSetRecoilState(memoState);
  const setFilteredMemo = useSetRecoilState(displayingMemoState);

  const localUpdateMemo = (
    props: LocalUpdateMemoProps[],
    type: 'original' | 'display' | 'both',
  ) => {
    const setData = (value: Memo): Memo => {
      const targetData = props.filter((d) => d.memoId === value._id);
      if (targetData.length > 0) {
        let setData = {
          ...value,
        };
        for (const data of targetData) {
          setData = { ...setData, ...data.data };
        }
        return setData;
      }
      return value;
    };

    if (type === 'both') {
      // オリジナルデータを更新
      setMemo((prevState) => prevState.map((value) => setData(value)));
      // 表示中のデータを更新
      setFilteredMemo((prevState) => prevState.map((value) => setData(value)));
    } else if (type === 'original') {
      // オリジナルデータを更新
      setMemo((prevState) => prevState.map((value) => setData(value)));
    } else if (type === 'display') {
      // 表示中のデータを更新
      setFilteredMemo((prevState) => prevState.map((value) => setData(value)));
    }
  };
  return localUpdateMemo;
};

export const useLocalUpdateComment = () => {
  const setMemo = useSetRecoilState(memoState);
  const setFilteredMemo = useSetRecoilState(displayingMemoState);

  const localUpdateComment = (
    memoId: string,
    commentID: string,
    { body, updatedAt, deleted, deletedAt, _text, _synchronized }: ChangeableComment,
  ) => {
    const setData = (value: Memo): Memo => {
      if (value._id === memoId) {
        const setData = {
          ...value,
          comments: value.comments.map((c) => {
            if (c._id === commentID) {
              return {
                ...c,
                body: body ?? c.body,
                updatedAt: updatedAt ?? c.updatedAt,
                deleted: deleted ?? c.deleted,
                deletedAt: deletedAt ?? c.deletedAt,
                _text: _text ?? c._text,
                _synchronized: _synchronized ?? c._synchronized,
              };
            } else {
              return c;
            }
          }),
        };
        return setData;
      }
      return value;
    };

    // オリジナルデータを更新
    setMemo((prevState) => prevState.map((value) => setData(value)));

    // 表示中のデータを更新
    setFilteredMemo((prevState) => prevState.map((value) => setData(value)));
  };
  return localUpdateComment;
};

export interface LocalUpdateCommentProps {
  memoId: string;
  commentId: string;
  data: ChangeableComment;
}

// 未使用
/* export const useLocalUpdateCommentMulti = () => {
  const setMemo = useSetRecoilState(memoState);
  const setFilteredMemo = useSetRecoilState(displayingMemoState);

  const localUpdateComment = (props: LocalUpdateCommentProps[]) => {
    const setData = (value: Memo): Memo => {
      const targetData = props.filter((d) => d.memoId === value._id);
      if (targetData.length > 0) {
        let setData = {
          ...value,
        };
        for (const data of targetData) {
          setData = {
            ...setData,
            comments: setData.comments.map((c) => {
              if (c._id === data.commentId) {
                return { ...c, ...data.data };
              } else {
                return c;
              }
            }),
          };
        }
        return setData;
      }
      return value;
    };

    // オリジナルデータを更新
    setMemo((prevState) => prevState.map((value) => setData(value)));

    // 表示中のデータを更新
    setFilteredMemo((prevState) => prevState.map((value) => setData(value)));
  };
  return localUpdateComment;
}; */

export interface LocalUpdateDataProps {
  memoId: string;
  commentId?: string;
  data: ChangeableComment;
}

export const useLocalUpdateData = () => {
  const setMemo = useSetRecoilState(memoState);
  const setFilteredMemo = useSetRecoilState(displayingMemoState);

  const localUpdateData = (props: LocalUpdateDataProps[]) => {
    const setData = (value: Memo): Memo => {
      const targetData = props.filter((d) => d.memoId === value._id);
      if (targetData.length > 0) {
        let setData = {
          ...value,
        };
        for (const data of targetData) {
          if (data.commentId === undefined) {
            setData = { ...setData, ...data.data };
          } else {
            setData = {
              ...setData,
              comments: setData.comments.map((c) => {
                if (c._id === data.commentId) {
                  return { ...c, ...data.data };
                } else {
                  return c;
                }
              }),
            };
          }
        }
        return setData;
      }
      return value;
    };
    // オリジナルデータを更新
    setMemo((prevState) => prevState.map((value) => setData(value)));

    // 表示中のデータを更新
    setFilteredMemo((prevState) => prevState.map((value) => setData(value)));
  };
  return localUpdateData;
};
