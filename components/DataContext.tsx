import { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { demoData } from '../utils/demoData';
import { useAuthContext } from '../components/AuthContext';
import { useOperationContext } from './OperationContext';
import { EditingContent } from './EditingInfoContext';

export interface Memo {
  id: number;
  created_at?: string;
  updated_at?: string;
  body: string;
  createdAt: string;
  updatedAt: string;
  completed: boolean;
  completedAt: string;
  deleted: boolean;
  deletedAt: string;
  comments: Comment[];
  user_id?: number;
  _text: string[];
  _date: string;
  _time: string;
  _synchronized: boolean;
  _tmpCompleted: boolean;
  _tmpCompletedAt: string;
  _type: 'memo' | 'date';
}

export interface Comment {
  id: number;
  created_at?: string;
  updated_at?: string;
  body: string;
  createdAt: string;
  updatedAt: string;
  deleted: boolean;
  deletedAt: string;
  memo_id?: number;
  _text: string[];
  _date: string;
  _time: string;
  _synchronized: boolean;
  _type: 'comment' | 'date';
}

interface SendMemo {
  body: string;
  createdAt: string;
  updatedAt: string;
  completed: boolean;
  completedAt: string;
  deleted: boolean;
  deletedAt: string;
}

interface SendComment {
  body: string;
  createdAt: string;
  updatedAt: string;
}

interface Data {
  data: Memo[];
  createMemo: (memo: Memo) => void;
  createComment: (comment: Comment, id: number) => void;
  updateLocalCompleted: (index: number, completed: boolean, completedAt: string) => void;
  updateServerCompleted: (index: number) => void;
  updateAllData: (data: EditingContent) => void;
  deleteMemo: (id: number | undefined) => void;
  deleteAccount: () => void;
  getTargetMemo: (id: number) => Memo | undefined;
}

const DataContext = createContext<Data | null>(null);

export function useDataContext() {
  return useContext(DataContext);
}

export function DataProvider({ children }: { children: any }) {
  const userInfo = useAuthContext();
  const user = userInfo?.user;
  const info = useOperationContext();

  const [data, setData] = useState<Memo[]>([]);

  useEffect(() => {
    // サーバーのデータを取得する
    (async () => {
      let serverData: Memo[] = [];
      console.log('user', user);
      if (user) {
        await axios
          .get(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/users/${user.uid}/memos`, {
            params: { limit: 1000, offset: 0 },
          })
          .then((res) => {
            serverData = res.data.contents;

            // ローカルデータを追加
            const clientData: Memo[] = serverData.map((data) => {
              data._text = data.body.split(/\r\n|\n|\r/gm);
              data._date = getDate(data.createdAt);
              data._time = getTime(data.createdAt);
              data._synchronized = true;
              data._tmpCompleted = data.completed;
              data._tmpCompletedAt = data.completedAt;
              data._type = 'memo';

              data.comments.map((data) => {
                data._text = data.body.split(/\r\n|\n|\r/gm);
                data._date = getDate(data.createdAt);
                data._time = getTime(data.createdAt);
                data._synchronized = true;
                data._type = 'comment';
              });

              return data;
            });

            setData(clientData);
            console.log('サーバーデータ', [...clientData]);

            // スクロール予約
            info?.changeScheduledScrolling(true);
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        setData(demoData);
      }
    })();
  }, [user]);

  const addDataToMemo = (memo: Memo) => {
    setData((prevState) => [...prevState, memo]);
  };

  const addDataToComment = (memoId: number, comment: Comment) => {
    setData((prevState) =>
      prevState.map((value) => {
        if (value.id === memoId) {
          value.comments.push(comment);
        }
        return value;
      }),
    );
  };

  const localUpdateData = (memoId: number, specifiedData: Memo) => {
    setData((prevState) =>
      prevState.map((value) => {
        if (value.id === memoId) {
          return specifiedData;
        }
        return value;
      }),
    );
  };

  function getDate(date: string): string {
    const weekChar = ['日', '月', '火', '水', '木', '金', '土'];
    const usedDate = new Date(date).toLocaleDateString();
    const month = usedDate.substring(5);
    const week = weekChar[new Date(date).getDay()];
    return `${month} (${week})`;
  }

  function getTime(date: string): string {
    const usedDate = new Date(date).toLocaleTimeString();
    const time = usedDate.substring(0, usedDate.lastIndexOf(':'));
    return time;
  }

  const convertSendMemo = (data: Memo): SendMemo => {
    const sendData = {
      body: data.body,
      createdAt: data.createdAt,
      updatedAt: data.updatedAt,
      completed: data.completed,
      completedAt: data.completedAt,
      deleted: data.deleted,
      deletedAt: data.deletedAt,
    };
    return sendData;
  };

  const convertSendComment = (data: Comment): SendComment => {
    const sendData = {
      body: data.body,
      createdAt: data.createdAt,
      updatedAt: data.updatedAt,
      deleted: data.deleted,
      deletedAt: data.deletedAt,
    };
    return sendData;
  };

  const getNowDate = (): string => {
    return new Date().toISOString();
  };

  const createMemo = async (memo: Memo) => {
    const date = getNowDate();
    memo.createdAt = date;
    memo.updatedAt = date;
    memo.completedAt = date;
    memo.deletedAt = date;
    memo._date = getDate(date);
    memo._time = getTime(date);

    const serverRegisteredID = await serverCreateMemoTable(memo);

    // サーバーで決定したIDをローカルに設定する
    if (serverRegisteredID !== undefined) {
      memo.id = serverRegisteredID;
      memo._synchronized = true;
    } else {
      memo.id = data[data.length - 1].id + 1;
      memo._synchronized = false;
    }

    addDataToMemo(memo);

    // スクロール予約
    info?.changeScheduledScrolling(true);
  };

  const serverCreateMemoTable = async (memo: Memo) => {
    let response;
    if (user) {
      await axios
        .post(
          `${process.env.NEXT_PUBLIC_API_URL}/api/v1/users/${user.uid}/memos`,
          convertSendMemo(memo),
        )
        .then((res) => {
          if (res.data.status === 200) {
            const serverRegisteredID = res.data.data.id;
            response = serverRegisteredID;
          }
        })
        .catch((err) => {});
    }

    return response;
  };

  const createComment = async (comment: Comment, id: number) => {
    const date = getNowDate();
    comment.createdAt = date;
    comment.updatedAt = date;
    comment.deletedAt = date;
    comment._date = getDate(date);
    comment._time = getTime(date);

    const serverRegisteredID = await serverCreateCommentTable(id, comment);

    // サーバーで決定したIDをローカルに設定する
    if (serverRegisteredID !== undefined) {
      comment.id = serverRegisteredID;
      comment._synchronized = true;
    } else {
      const targetComment = data.filter((d) => d.id === id)[0].comments;
      comment.id = targetComment[targetComment.length - 1].id + 1;
      comment._synchronized = false;
    }

    addDataToComment(id, comment);
  };

  const serverCreateCommentTable = async (id: number, comment: Comment) => {
    let response;
    if (user) {
      await axios
        .post(
          `${process.env.NEXT_PUBLIC_API_URL}/api/v1/users/${user.uid}/memos/${id}/comments`,
          convertSendComment(comment),
        )
        .then((res) => {
          if (res.data.status === 200) {
            const serverRegisteredID = res.data.data.id;
            response = serverRegisteredID;
          }
        })
        .catch((err) => {});
    }

    return response;
  };

  const serverUpdateMemoTable = async (id: number, specifiedData?: Memo) => {
    let sendData: Memo;
    if (specifiedData !== undefined) {
      sendData = specifiedData;
    } else {
      const targetMemo = getTargetMemo(id);
      if (targetMemo === undefined) return;
      sendData = targetMemo;
    }

    if (user) {
      await axios
        .patch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/v1/users/${user.uid}/memos/${id}`,
          convertSendMemo(sendData),
        )
        .then((res) => {})
        .catch((err) => {});
    }
  };

  const updateLocalCompleted = (id: number, completed: boolean, completedAt: string) => {
    const targetMemo = getTargetMemo(id);
    if (targetMemo === undefined) return;

    targetMemo.completed = completed;
    targetMemo._tmpCompleted = completed;
    if (targetMemo.completed) {
      targetMemo.completedAt = completedAt;
      targetMemo._tmpCompletedAt = completedAt;
    }

    localUpdateData(id, targetMemo);
  };

  const updateServerCompleted = (id: number) => {
    // 制御用のローカル変数を更新
    const targetMemo = getTargetMemo(id);
    if (targetMemo === undefined) return;

    const updateValue = !targetMemo._tmpCompleted;

    targetMemo._tmpCompleted = updateValue;
    if (updateValue) {
      const date = getNowDate();
      targetMemo._tmpCompletedAt = date;
    }

    localUpdateData(id, targetMemo);

    // 完了済みフラグを更新
    const targetMemo2 = getTargetMemo(id);
    if (targetMemo2 === undefined) return;

    targetMemo2.completed = updateValue;

    if (updateValue) {
      targetMemo2.completedAt = targetMemo._tmpCompletedAt;
    }

    serverUpdateMemoTable(id, targetMemo2);
  };

  const updateAllData = async (editingData: EditingContent) => {
    const id = info?.editingContentID;
    if (id === undefined) return;

    // メモが空のとき、メモ削除確認ダイアログを表示
    if (editingData.body.length === 0) {
      info?.changeDisplayAlertDialog('delete-memo');
      return;
    }

    const targetMemo = getTargetMemo(id);
    if (targetMemo === undefined) return;

    const date = getNowDate();

    // メモの更新
    if (targetMemo.body !== editingData.body) {
      targetMemo.body = editingData.body;
      targetMemo._text = editingData.body.split(/\r\n|\n|\r/gm);
      targetMemo.updatedAt = date;

      serverUpdateMemoTable(id, targetMemo);
    }

    // コメントの更新
    for (let i = 0; i < targetMemo.comments.length; i++) {
      if (targetMemo.comments[i].body !== editingData.comments[i].body) {
        if (editingData.comments[i].body.length > 0) {
          // 更新
          targetMemo.comments[i].body = editingData.comments[i].body;
          targetMemo.comments[i]._text = editingData.comments[i].body.split(/\r\n|\n|\r/gm);
          targetMemo.comments[i].updatedAt = date;
        } else {
          // 削除
          targetMemo.comments[i].deleted = true;
          targetMemo.comments[i].deletedAt = date;
        }

        serverUpdateCommentTable(id, targetMemo.comments[i].id, targetMemo.comments[i]);
      }
    }

    localUpdateData(id, targetMemo);
  };

  const serverUpdateCommentTable = async (
    memoID: number,
    commentID: number,
    specifiedData?: Comment,
  ) => {
    let sendData: Comment;
    if (specifiedData !== undefined) {
      sendData = specifiedData;
    } else {
      const targetMemo = data.find((m) => m.id === memoID);
      if (targetMemo === undefined) return;
      const targetComment = targetMemo.comments.find((c) => c.id === commentID);
      if (targetComment === undefined) return;
      sendData = targetComment;
    }

    if (user) {
      await axios
        .patch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/v1/users/${user.uid}/memos/${memoID}/comments/${commentID}`,
          convertSendComment(sendData),
        )
        .then((res) => {})
        .catch((err) => {});
    }
  };

  const deleteMemo = async (id: number | undefined) => {
    if (id === undefined) return;

    const date = getNowDate();

    const targetMemo = data.filter((d) => d.id === id)[0];

    targetMemo.deleted = true;
    targetMemo.deletedAt = date;

    serverUpdateMemoTable(id, targetMemo);

    localUpdateData(id, targetMemo);
  };

  const deleteAccount = async () => {
    if (user) {
      await axios
        .delete(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/users/${user.uid}`)
        .then((res) => {})
        .catch((err) => {});
    }
  };

  const getTargetMemo = (id: number): Memo | undefined => {
    const targetMemo = data.find((m) => m.id === id);
    if (targetMemo === undefined) return;

    const deepCopyMemo = { ...targetMemo };
    const deepCopyComments = targetMemo.comments.map((comment) => ({ ...comment }));
    deepCopyMemo.comments = deepCopyComments;

    return deepCopyMemo;
  };

  const dataHandler: Data = {
    data: data,
    createMemo: createMemo,
    createComment: createComment,
    updateLocalCompleted: updateLocalCompleted,
    updateAllData: updateAllData,
    deleteMemo: deleteMemo,
    deleteAccount: deleteAccount,
    updateServerCompleted: updateServerCompleted,
    getTargetMemo: getTargetMemo,
  };

  return <DataContext.Provider value={dataHandler}>{children}</DataContext.Provider>;
}
