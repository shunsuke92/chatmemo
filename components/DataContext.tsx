import { createContext, useState, useContext, useEffect, useRef } from 'react';
import axios from 'axios';
import { demoData } from '../utils/demoData';
import { useAuthContext } from '../components/AuthContext';
import { useOperationContext } from './OperationContext';
import { useSetTimeout } from '../hooks/useSetTimeout';
import { useSynchronizationProsess } from '../hooks/useSynchronizationProsess';
import { useCreateID } from '../hooks/useCreateID';
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
  _id: string;
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
  _id: string;
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

export interface Data {
  data: Memo[];
  createMemo: (memo: Memo) => void;
  createComment: (comment: Comment, id: string) => void;
  updateLocalCompleted: (id: string) => void;
  updateServerCompleted: (id: string) => void;
  updateEditData: (data: EditingContent) => void;
  deleteMemo: (id: string | undefined) => void;
  deleteAccount: () => Promise<boolean>;
  getTargetMemo: (id: string) => Memo | undefined;
  completeDeletionMemo: (id: string | undefined) => void;
}

const DataContext = createContext<Data | null>(null);

export function useDataContext() {
  return useContext(DataContext);
}

export function DataProvider({ children }: { children: any }) {
  const userInfo = useAuthContext();
  const user = userInfo?.user;
  const info = useOperationContext();
  const setTimer = useSetTimeout();
  const synchronizationProsess = useSynchronizationProsess();
  const setUnsynchronizedFunction = synchronizationProsess.setUnsynchronizedFunction;
  const createManageMemoID = synchronizationProsess.createManageMemoID;
  const createManageCommentID = synchronizationProsess.createManageCommentID;
  const setConfirmedMemoID = synchronizationProsess.setConfirmedMemoID;
  const setConfirmedCommentID = synchronizationProsess.setConfirmedCommentID;
  const getConfirmedMemoID = synchronizationProsess.getConfirmedMemoID;
  const getConfirmedCommentID = synchronizationProsess.getConfirmedCommentID;
  const createErrID = useCreateID('E');

  const [data, setData] = useState<Memo[]>([]);
  const bookDelayCompletedID = useRef<string[]>([]);
  const dataRef = useRef<Memo[]>([]);

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
              data._id = data.id.toString();

              data.comments.map((data) => {
                data._text = data.body.split(/\r\n|\n|\r/gm);
                data._date = getDate(data.createdAt);
                data._time = getTime(data.createdAt);
                data._synchronized = true;
                data._type = 'comment';
                data._id = data.id.toString();
              });

              return data;
            });

            setData(clientData);
            console.log('サーバーデータ', [...clientData]);

            // スクロール予約
            info?.changeScheduledScrolling(true);
          })
          .catch((err) => {});
      } else {
        setData(demoData);
      }
    })();
  }, [user]);

  useEffect(() => {
    dataRef.current = data;
  }, [data]);

  const addDataToMemo = (memo: Memo) => {
    setData((prevState) => [...prevState, memo]);
  };

  const addDataToComment = (memoId: string, comment: Comment) => {
    setData((prevState) =>
      prevState.map((value) => {
        if (value._id === memoId) {
          value.comments.push(comment);
        }
        return value;
      }),
    );
  };

  const localUpdateData = (memoId: string, specifiedData: Memo) => {
    setData((prevState) =>
      prevState.map((value) => {
        if (value._id === memoId) {
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
    const errID = createErrID();

    const result = await seveServerVerCreateMemo(() => serverCreateMemoTable(memo), errID);

    if (result !== -1) {
      memo._synchronized = true;
      memo._id = result.toString();
    } else {
      memo._synchronized = false;
      memo._id = errID;
    }

    addDataToMemo(memo);

    // スクロール予約
    info?.changeScheduledScrolling(true);
  };

  const seveServerVerCreateMemo = async (
    func: () => Promise<number>,
    errMemoID: string,
  ): Promise<number> => {
    const getForSynchronization = (func: () => Promise<number>, errMemoID: string) => {
      // 通信可能になったら実行する関数
      return async () => {
        const result = await func();

        // 通信成功のとき
        if (result !== -1) {
          // 同期済みフラグをオンにする
          changeSynchronizedFlag(errMemoID);

          // サーバーで決定したIDをID管理に保存する
          setConfirmedMemoID(errMemoID, result);
        }

        return result;
      };
    };

    const saveUnsynchronizedFunction = (func: () => Promise<number>, errMemoID: string) => {
      createManageMemoID(errMemoID);

      setUnsynchronizedFunction(() => getForSynchronization(func, errMemoID));
    };

    const result = await func();

    // 通信に失敗したとき
    if (result === -1) {
      saveUnsynchronizedFunction(func, errMemoID);
    }

    return result;
  };

  const seveServerVerCreateComment = async (
    func: () => Promise<number>,
    memoID: string,
    errCommentID: string,
  ): Promise<number> => {
    const getForSynchronization = (
      func: () => Promise<number>,
      memoID: string,
      errCommentID: string,
    ) => {
      // 通信可能になったら実行する関数
      return async () => {
        const result = await func();

        // 通信成功のとき
        if (result !== -1) {
          // 同期済みフラグをオンにする
          changeSynchronizedFlag(memoID, errCommentID);

          // サーバーで決定したIDをID管理に保存する
          setConfirmedCommentID(errCommentID, result);
        }

        return result;
      };
    };

    const saveUnsynchronizedFunction = (
      func: () => Promise<number>,
      memoID: string,
      errCommentID: string,
    ) => {
      createManageCommentID(errCommentID);

      setUnsynchronizedFunction(() => getForSynchronization(func, memoID, errCommentID));
    };

    const result = await func();

    // 通信に失敗したとき
    if (result === -1) {
      saveUnsynchronizedFunction(func, memoID, errCommentID);
    }

    return result;
  };

  const seveServer = async (
    func: () => Promise<boolean>,
    memoID: string,
    commentID?: string,
  ): Promise<boolean> => {
    const getForSynchronization = (
      func: () => Promise<boolean>,
      memoID: string,
      errCommentID?: string,
    ) => {
      // 通信可能になったら実行する関数
      return async () => {
        const result = await func();
        // 通信成功のとき
        if (result) {
          // 同期済みフラグをオンにする
          changeSynchronizedFlag(memoID, commentID);
        }
        return result;
      };
    };

    const saveUnsynchronizedFunction = (
      func: () => Promise<boolean>,
      memoID: string,
      commentID?: string,
    ) => {
      setUnsynchronizedFunction(() => getForSynchronization(func, memoID, commentID));
    };

    const result = await func();

    // 通信に失敗したとき
    if (!result) {
      saveUnsynchronizedFunction(func, memoID, commentID);
    }

    return result;
  };

  const serverCreateMemoTable = async (memo: Memo): Promise<number> => {
    let response = -1;
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

  const createComment = async (comment: Comment, id: string) => {
    const date = getNowDate();
    comment.createdAt = date;
    comment.updatedAt = date;
    comment.deletedAt = date;
    comment._date = getDate(date);
    comment._time = getTime(date);
    const ErrID = createErrID();

    const result = await seveServerVerCreateComment(
      () => serverCreateCommentTable(id, comment),
      id,
      ErrID,
    );

    if (result !== -1) {
      comment._synchronized = true;
      comment._id = result.toString();
    } else {
      comment._synchronized = false;
      comment._id = ErrID;
    }

    addDataToComment(id, comment);
  };

  const serverCreateCommentTable = async (id: string, comment: Comment): Promise<number> => {
    const sendID = getConfirmedMemoID(id) ?? id;

    let response = -1;
    if (user) {
      await axios
        .post(
          `${process.env.NEXT_PUBLIC_API_URL}/api/v1/users/${user.uid}/memos/${sendID}/comments`,
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

  const serverUpdateMemoTable = async (id: string, specifiedData?: Memo): Promise<boolean> => {
    const sendID = getConfirmedMemoID(id) ?? id;

    let sendData: Memo;
    if (specifiedData !== undefined) {
      sendData = specifiedData;
    } else {
      const targetMemo = getTargetMemo(id);
      if (targetMemo === undefined) return false;
      sendData = targetMemo;
    }

    let response = false;
    if (user) {
      await axios
        .patch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/v1/users/${user.uid}/memos/${sendID}`,
          convertSendMemo(sendData),
        )
        .then((res) => {
          response = true;
        })
        .catch((err) => {
          response = false;
        });
    }

    return response;
  };

  const updateLocalCompleted = (id: string) => {
    if (!bookDelayCompletedID.current.includes(id)) {
      bookDelayCompletedID.current.push(id);
    }

    // 時間差で更新
    setTimer(updateLocalCompletedCallback, 2000);
  };

  const updateLocalCompletedCallback = () => {
    for (let i = 0; i < bookDelayCompletedID.current.length; i++) {
      const id = bookDelayCompletedID.current[i];
      const targetData = getTargetMemoRefVer(id);
      if (targetData === undefined) return;

      const beforeValue = targetData.completed;
      const afterValue = targetData._tmpCompleted;
      const isChanged = beforeValue !== afterValue;

      if (isChanged) {
        targetData.completed = targetData._tmpCompleted;
        if (targetData.completed) {
          targetData.completedAt = targetData._tmpCompletedAt;
        }
        localUpdateData(id, targetData);
      }
    }

    bookDelayCompletedID.current = [];
  };

  const updateServerCompleted = async (id: string) => {
    const targetMemoForLocal = getTargetMemo(id);
    if (targetMemoForLocal === undefined) return;

    const targetMemoForServer = getTargetMemo(id);
    if (targetMemoForServer === undefined) return;

    const updateValue = !targetMemoForLocal._tmpCompleted;

    targetMemoForLocal._tmpCompleted = updateValue;
    targetMemoForServer.completed = updateValue;

    if (updateValue) {
      const date = getNowDate();
      targetMemoForLocal._tmpCompletedAt = date;
      targetMemoForServer.completedAt = date;
    }

    const result = await seveServer(() => serverUpdateMemoTable(id, targetMemoForServer), id);

    if (result) {
      targetMemoForLocal._synchronized = true;
    } else {
      targetMemoForLocal._synchronized = false;
    }

    localUpdateData(id, targetMemoForLocal);
  };

  const updateEditData = async (editingData: EditingContent) => {
    const id = info?.editingContentID;
    if (id === undefined) return;

    // メモが空のとき、メモ削除確認ダイアログを表示
    if (editingData.body.length === 0) {
      info?.changeDisplayAlertDialog('delete-memo', id);
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

      const result = await seveServer(() => serverUpdateMemoTable(id, targetMemo), id);

      if (result) {
        targetMemo._synchronized = true;
      } else {
        targetMemo._synchronized = false;
      }
    }

    // コメントの更新
    for (let i = 0; i < targetMemo.comments.length; i++) {
      await updateEditDataComment(targetMemo.comments[i], editingData.comments[i], date, id);
    }

    localUpdateData(id, targetMemo);
  };

  const updateEditDataComment = (
    comment: Comment,
    editingData: { id: string; body: string },
    date: string,
    memoID: string,
  ) => {
    return new Promise(async (resolve) => {
      const targetComment = comment;
      if (targetComment.body !== editingData.body) {
        if (editingData.body.length > 0) {
          // 更新
          targetComment.body = editingData.body;
          targetComment._text = editingData.body.split(/\r\n|\n|\r/gm);
          targetComment.updatedAt = date;
        } else {
          // 削除
          targetComment.deleted = true;
          targetComment.deletedAt = date;
        }

        const result = await seveServer(
          () => serverUpdateCommentTable(memoID, targetComment._id, targetComment),
          memoID,
          targetComment._id,
        );

        if (result) {
          targetComment._synchronized = true;
          resolve(true);
        } else {
          targetComment._synchronized = false;
          resolve(true);
        }
      } else {
        resolve(true);
      }
    });
  };

  const serverUpdateCommentTable = async (
    memoID: string,
    commentID: string,
    specifiedData?: Comment,
  ): Promise<boolean> => {
    const sendMemoID = getConfirmedMemoID(memoID) ?? memoID;
    const sendCommentID = getConfirmedCommentID(commentID) ?? commentID;

    let sendData: Comment;
    if (specifiedData !== undefined) {
      sendData = specifiedData;
    } else {
      const targetMemo = data.find((m) => m._id === memoID);
      if (targetMemo === undefined) return false;
      const targetComment = targetMemo.comments.find((c) => c._id === commentID);
      if (targetComment === undefined) return false;
      sendData = targetComment;
    }

    let response = false;
    if (user) {
      await axios
        .patch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/v1/users/${user.uid}/memos/${sendMemoID}/comments/${sendCommentID}`,
          convertSendComment(sendData),
        )
        .then((res) => {
          response = true;
        })
        .catch((err) => {
          response = false;
        });
    }

    return response;
  };

  const serverDeleteMemoTable = async (memoID: string): Promise<boolean> => {
    const sendID = getConfirmedMemoID(memoID) ?? memoID;

    // サーバーから完全削除
    let response = false;
    if (user) {
      await axios
        .delete(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/users/${user.uid}/memos/${sendID}`)
        .then((res) => {
          response = true;
        })
        .catch((err) => {
          response = false;
        });
    }

    return response;
  };

  const deleteMemo = async (id: string | undefined) => {
    if (id === undefined) return;

    const date = getNowDate();

    const targetMemo = data.filter((d) => d._id === id)[0];

    targetMemo.deleted = true;
    targetMemo.deletedAt = date;

    const result = await seveServer(() => serverUpdateMemoTable(id, targetMemo), id);

    if (result) {
      targetMemo._synchronized = true;
    } else {
      targetMemo._synchronized = false;
    }

    localUpdateData(id, targetMemo);
  };

  const completeDeletionMemo = async (id: string | undefined) => {
    if (id === undefined) return;

    // サーバーから完全削除
    await seveServer(() => serverDeleteMemoTable(id), id);

    // ローカルから完全削除
    setData((prevState) => prevState.filter((value) => value._id !== id));
  };

  const deleteAccount = async (): Promise<boolean> => {
    let result = false;
    if (user) {
      await axios
        .delete(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/users/${user.uid}`)
        .then((res) => {
          result = true;
        })
        .catch((err) => {
          result = false;
        });
    }
    return result;
  };

  const changeSynchronizedFlag = (memoID: string, commentID?: string) => {
    const targetMemo = getTargetMemoRefVer(memoID);
    if (targetMemo === undefined) return;

    if (commentID === undefined) {
      targetMemo._synchronized = true;
    } else {
      const targetComment = targetMemo.comments.find((m) => m._id === commentID);
      if (targetComment === undefined) return;
      targetComment._synchronized = true;
    }

    localUpdateData(memoID, targetMemo);
  };

  const getTargetMemo = (id: string): Memo | undefined => {
    const targetMemo = data.find((m) => m._id === id);
    if (targetMemo === undefined) return;

    const deepCopyMemo = { ...targetMemo };
    const deepCopyComments = targetMemo.comments.map((comment) => ({ ...comment }));
    deepCopyMemo.comments = deepCopyComments;

    return deepCopyMemo;
  };

  const getTargetMemoRefVer = (id: string): Memo | undefined => {
    const targetMemo = dataRef.current.find((m) => m._id === id);
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
    updateEditData: updateEditData,
    deleteMemo: deleteMemo,
    deleteAccount: deleteAccount,
    updateServerCompleted: updateServerCompleted,
    getTargetMemo: getTargetMemo,
    completeDeletionMemo: completeDeletionMemo,
  };

  return <DataContext.Provider value={dataHandler}>{children}</DataContext.Provider>;
}
