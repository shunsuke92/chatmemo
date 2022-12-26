import { createContext, useState, useContext } from 'react';
import { useOperateUpdateEditData } from '../hooks/useOperateUpdateEditData';
import { InternalData } from './Timeline';

export interface EditingInfo {
  editingContentBefore: EditingContent | undefined;
  editingContentAfter: EditingContent | undefined;
  createEditingContentInfo: (data: InternalData) => void;
  clearEditingContentInfo: () => void;
  updateEditingContentAfter: (text: string, commentID?: string) => void;
  isChanged: () => void;
  overwriteData: () => void;
}

export interface EditingContent {
  id: string;
  body: string;
  comments: { id: string; body: string }[];
}

const EditingInfoContext = createContext<EditingInfo | undefined>(undefined);

export function useEditingInfoContext() {
  return useContext(EditingInfoContext);
}

export function EditingInfoProvider({ children }: { children: any }) {
  const [editingContentBefore, setEditingContentBefore] = useState<EditingContent | undefined>(
    undefined,
  );
  const [editingContentAfter, setEditingContentAfter] = useState<EditingContent | undefined>(
    undefined,
  );

  const updateEditData = useOperateUpdateEditData();

  function createEditingContentInfo(data: InternalData) {
    if (data.comments === undefined) return;
    const commentBefore = data.comments.map((comment) => {
      return {
        id: comment._id,
        body: comment.body,
      };
    });
    const commentAfter = data.comments.map((comment) => {
      return {
        id: comment._id,
        body: comment.body,
      };
    });

    const contentBefore = {
      id: data.id,
      body: data.body,
      comments: commentBefore,
    };

    const contentAfter = {
      id: data.id,
      body: data.body,
      comments: commentAfter,
    };

    setEditingContentBefore(contentBefore);
    setEditingContentAfter(contentAfter);
  }

  function clearEditingContentInfo() {
    setEditingContentBefore(undefined);
    setEditingContentAfter(undefined);
  }

  const updateEditingContentAfter = (text: string, commentID?: string) => {
    if (commentID === undefined) {
      setEditingContentAfter((prevState) => {
        if (prevState !== undefined) {
          prevState.body = text;
        }
        return prevState !== undefined ? { ...prevState } : undefined;
      });
    } else {
      setEditingContentAfter((prevState) => {
        if (prevState !== undefined) {
          prevState.comments = prevState.comments.map((comment) => {
            if (comment.id === commentID) {
              comment.body = text;
            }
            return comment;
          });
        }
        return prevState !== undefined ? { ...prevState } : undefined;
      });
    }
  };

  const isChanged = () => {
    if (editingContentBefore?.body !== editingContentAfter?.body) {
      return true;
    }

    for (let i = 0; i < (editingContentBefore?.comments.length ?? 0); i++) {
      if (editingContentBefore?.comments[i].body !== editingContentAfter?.comments[i].body) {
        return true;
      }
    }
    return false;
  };

  const overwriteData = () => {
    if (!isChanged || editingContentBefore === undefined || editingContentAfter === undefined)
      return;
    updateEditData(editingContentBefore, editingContentAfter);
  };

  const info: EditingInfo = {
    editingContentBefore: editingContentBefore,
    editingContentAfter: editingContentAfter,
    createEditingContentInfo: createEditingContentInfo,
    clearEditingContentInfo: clearEditingContentInfo,
    updateEditingContentAfter: updateEditingContentAfter,
    isChanged: isChanged,
    overwriteData: overwriteData,
  };

  return <EditingInfoContext.Provider value={info}>{children}</EditingInfoContext.Provider>;
}
