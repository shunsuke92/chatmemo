import { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { demoData } from '../src/demoData';
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
  _isDateDisplay: boolean;
  _synchronized: boolean;
}

interface Comment {
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
  _isDateDisplay: boolean;
  _synchronized: boolean;
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
  updateCompleted: (index: number) => void;
  updateAllData: (data: EditingContent) => void;
  deleteMemo: (id: number | undefined) => void;
  deleteAccount: () => void;
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

  function getDate(date: string): string {
    const weekChar = ['日', '月', '火', '水', '木', '金', '土'];
    const usedDate = new Date(date).toLocaleDateString();
    const month = usedDate.substring(5);
    const week = weekChar[new Date(date).getDay()];
    return `${month}(${week})`;
  }

  function getTime(date: string): string {
    const usedDate = new Date(date).toLocaleTimeString();
    const time = usedDate.substring(0, usedDate.lastIndexOf(':'));
    return time;
  }

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
              data._isDateDisplay = false;
              data._synchronized = true;

              data.comments.map((data) => {
                data._text = data.body.split(/\r\n|\n|\r/gm);
                data._date = getDate(data.createdAt);
                data._time = getTime(data.createdAt);
                data._isDateDisplay = false;
                data._synchronized = true;
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

    // サーバーに保存
    if (user) {
      await axios
        .post(
          `${process.env.NEXT_PUBLIC_API_URL}/api/v1/users/${user.uid}/memos`,
          convertSendMemo(memo),
        )
        .then((res) => {
          const serverRegisteredID = res.data.data.id;
          memo.id = serverRegisteredID;
          memo._synchronized = true;
        })
        .catch((err) => {
          memo.id = data[data.length - 1].id + 1;
        });
    }

    // ローカルに保存
    setData((prevState) => [...prevState, memo]);

    // スクロール予約
    info?.changeScheduledScrolling(true);
  };

  const createComment = async (comment: Comment, id: number) => {
    const date = getNowDate();
    comment.createdAt = date;
    comment.updatedAt = date;
    comment.deletedAt = date;
    comment._date = getDate(date);
    comment._time = getTime(date);

    // サーバーに保存
    if (user) {
      await axios
        .post(
          `${process.env.NEXT_PUBLIC_API_URL}/api/v1/users/${user.uid}/memos/${id}/comments`,
          convertSendComment(comment),
        )
        .then((res) => {
          const serverRegisteredID = res.data.data.id;
          comment.id = serverRegisteredID;
          comment._synchronized = true;
        })
        .catch((err) => {
          const targetComment = data.filter((d) => d.id === id)[0].comments;
          comment.id = targetComment[targetComment.length - 1].id + 1;
        });
    }

    // ローカルに保存
    setData((prevState) =>
      prevState.map((value) => {
        if (value.id === id) {
          value.comments.push(comment);
        }
        return value;
      }),
    );
  };

  const updateCompleted = async (id: number) => {
    const targetMemo = data.find((m) => m.id === id);
    if (targetMemo === undefined) return;

    targetMemo.completed = !targetMemo.completed;
    if (targetMemo.completed) {
      const date = getNowDate();
      targetMemo.completedAt = date;
    }

    // サーバーに保存
    if (user) {
      await axios
        .patch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/v1/users/${user.uid}/memos/${id}`,
          convertSendMemo(targetMemo),
        )
        .then((res) => {})
        .catch((err) => {});
    }

    // ローカルに保存
    setData((prevState) =>
      prevState.map((value) => {
        if (value.id === id) {
          return targetMemo;
        }
        return value;
      }),
    );
  };

  const updateAllData = async (editingData: EditingContent) => {
    const id = info?.editingContentID;
    if (id === undefined) return;

    // メモが空のとき、メモ削除確認ダイアログを表示
    if (editingData.body.length === 0) {
      info?.changeDisplayAlertDialog('delete-memo');
      return;
    }

    const targetMemo = data.find((m) => m.id === id);
    if (targetMemo === undefined) return;

    const date = getNowDate();

    // メモの更新
    if (targetMemo.body !== editingData.body) {
      targetMemo.body = editingData.body;
      targetMemo._text = editingData.body.split(/\r\n|\n|\r/gm);
      targetMemo.updatedAt = date;

      // サーバーに保存
      if (user) {
        await axios
          .patch(
            `${process.env.NEXT_PUBLIC_API_URL}/api/v1/users/${user.uid}/memos/${id}`,
            convertSendMemo(targetMemo),
          )
          .then((res) => {})
          .catch((err) => {});
      }
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
        // サーバーに保存
        if (user) {
          await axios
            .patch(
              `${process.env.NEXT_PUBLIC_API_URL}/api/v1/users/${user.uid}/memos/${id}/comments/${targetMemo.comments[i].id}`,
              convertSendComment(targetMemo.comments[i]),
            )
            .then((res) => {})
            .catch((err) => {});
        }
      }
    }

    // ローカルに保存
    setData((prevState) =>
      prevState.map((value) => {
        if (value.id === id) {
          return targetMemo;
        }
        return value;
      }),
    );
  };

  const deleteMemo = async (id: number | undefined) => {
    if (id === undefined) return;

    const date = getNowDate();

    const targetMemo = data.filter((d) => d.id === id)[0];

    targetMemo.deleted = true;
    targetMemo.deletedAt = date;

    // サーバーに保存
    if (user) {
      await axios
        .patch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/v1/users/${user.uid}/memos/${id}`,
          convertSendMemo(targetMemo),
        )
        .then((res) => {
          console.log('送信成功', res);
        })
        .catch((err) => {
          console.log('送信失敗', err);
        });
    }

    // ローカルに保存
    setData((prevState) =>
      prevState.map((value) => {
        if (value.id === id) {
          return targetMemo;
        }
        return value;
      }),
    );
  };

  const deleteAccount = async () => {
    if (user) {
      await axios
        .delete(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/users/${user.uid}`)
        .then((res) => {})
        .catch((err) => {});
    }
  };

  const dataHandler: Data = {
    data: data,
    createMemo: createMemo,
    createComment: createComment,
    updateCompleted: updateCompleted,
    updateAllData: updateAllData,
    deleteMemo: deleteMemo,
    deleteAccount: deleteAccount,
  };

  return <DataContext.Provider value={dataHandler}>{children}</DataContext.Provider>;
}
