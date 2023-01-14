import { useRecoilValue } from 'recoil';
import { useSetRecoilState } from 'recoil';

import { EditingContent } from '../components/EditingInfoContext';
import { useChangeDisplayAlertDialog } from '../hooks/useChangeDisplayAlertDialog';
import { editingContentIDState } from '../states/editingContentIDState';
import { scrollingIDState } from '../states/scrollingIDState';
import { getNowDate } from '../utils/getNowDate';
import {
  ChangeableMemo,
  ChangeableComment,
  LocalUpdateCommentProps,
  LocalUpdateDataProps,
  useLocalUpdateData,
} from './useLocalUpdateData';
import { useSaveServer } from './useSaveServer';
import { useServerUpdateCommentTable } from './useServerUpdateCommentTable';
import { useServerUpdateMemoTable } from './useServerUpdateMemoTable';

export const useOperateUpdateEditData = () => {
  const saveServer = useSaveServer();
  const serverUpdateMemoTable = useServerUpdateMemoTable();
  const serverUpdateCommentTable = useServerUpdateCommentTable();
  const localUpdateData = useLocalUpdateData();
  const setScrollingID = useSetRecoilState(scrollingIDState);

  const changeDisplayAlertDialog = useChangeDisplayAlertDialog();
  const editingContentID = useRecoilValue(editingContentIDState);

  const updateEditData = async (
    editingContentBefore: EditingContent,
    editingContentAfter: EditingContent,
  ) => {
    const id = editingContentID;
    if (id === undefined) return;

    // メモが空のとき、メモ削除確認ダイアログを表示
    if (editingContentAfter.body.length === 0) {
      changeDisplayAlertDialog('delete-memo', id);
      return;
    }

    let setData: LocalUpdateDataProps[] = [];

    const date = getNowDate();

    // メモの更新
    if (editingContentBefore.body !== editingContentAfter.body) {
      let setMemo: ChangeableMemo = {};
      setMemo.body = editingContentAfter.body;
      setMemo._text = editingContentAfter.body.split(/\r\n|\n|\r/gm);
      setMemo.updatedAt = date;

      const result = await saveServer(() => serverUpdateMemoTable(id, setMemo), id);

      if (result) {
        setMemo._synchronized = true;
      } else {
        setMemo._synchronized = false;
      }
      setData.push({ memoId: id, data: setMemo });
    }

    // コメントの更新
    for (let i = 0; i < editingContentBefore.comments.length; i++) {
      const data = await updateEditDataComment(
        editingContentBefore.comments[i],
        editingContentAfter.comments[i],
        date,
        id,
      );
      if (data !== undefined) {
        setData.push(data);
      }
    }

    localUpdateData(setData);

    // スクロール予約
    setScrollingID(id);
  };

  const updateEditDataComment = (
    editingContentBefore: { id: string; body: string },
    editingContentAfter: { id: string; body: string },
    date: string,
    memoID: string,
  ): Promise<LocalUpdateCommentProps | undefined> => {
    return new Promise(async (resolve) => {
      let setComment: ChangeableComment = {};
      if (editingContentBefore.body !== editingContentAfter.body) {
        if (editingContentAfter.body.length > 0) {
          // 更新
          setComment.body = editingContentAfter.body;
          setComment._text = editingContentAfter.body.split(/\r\n|\n|\r/gm);
          setComment.updatedAt = date;
        } else {
          // 削除
          setComment.deleted = true;
          setComment.deletedAt = date;
        }

        const result = await saveServer(
          () => serverUpdateCommentTable(memoID, editingContentBefore.id, setComment),
          memoID,
          editingContentBefore.id,
        );

        if (result) {
          setComment._synchronized = true;
          const res = { memoId: memoID, commentId: editingContentBefore.id, data: setComment };
          resolve(res);
        } else {
          setComment._synchronized = false;
          const res = { memoId: memoID, commentId: editingContentBefore.id, data: setComment };
          resolve(res);
        }
      } else {
        resolve(undefined);
      }
    });
  };

  return updateEditData;
};
