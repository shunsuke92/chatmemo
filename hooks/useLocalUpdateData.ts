import { useSetRecoilState } from 'recoil';

import { memoState } from '../states/memoState';

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
    setMemo((prevState) =>
      prevState.map((value) => {
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
      }),
    );
  };
  return localUpdateMemo;
};

export interface LocalUpdateMemoProps {
  memoId: string;
  data: ChangeableMemo;
}

export const useLocalUpdateMemoMulti = () => {
  const setMemo = useSetRecoilState(memoState);

  const localUpdateMemo = (props: LocalUpdateMemoProps[]) => {
    setMemo((prevState) =>
      prevState.map((value) => {
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
      }),
    );
  };
  return localUpdateMemo;
};

export const useLocalUpdateComment = () => {
  const setMemo = useSetRecoilState(memoState);

  const localUpdateComment = (
    memoId: string,
    commentID: string,
    { body, updatedAt, deleted, deletedAt, _text, _synchronized }: ChangeableComment,
  ) => {
    setMemo((prevState) =>
      prevState.map((value) => {
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
      }),
    );
  };
  return localUpdateComment;
};

export interface LocalUpdateCommentProps {
  memoId: string;
  commentId: string;
  data: ChangeableComment;
}

export const useLocalUpdateCommentMulti = () => {
  const setMemo = useSetRecoilState(memoState);

  const localUpdateComment = (props: LocalUpdateCommentProps[]) => {
    setMemo((prevState) =>
      prevState.map((value) => {
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
      }),
    );
  };
  return localUpdateComment;
};

export interface LocalUpdateDataProps {
  memoId: string;
  commentId?: string;
  data: ChangeableComment;
}

export const useLocalUpdateData = () => {
  const setMemo = useSetRecoilState(memoState);

  const localUpdateData = (props: LocalUpdateDataProps[]) => {
    setMemo((prevState) =>
      prevState.map((value) => {
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
      }),
    );
  };
  return localUpdateData;
};

export const useLocalDeleteMemo = () => {
  const setMemo = useSetRecoilState(memoState);

  const localDeleteMemo = (memoId: string) => {
    setMemo((prevState) => prevState.filter((value) => value._id !== memoId));
  };
  return localDeleteMemo;
};
