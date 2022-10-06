import { createContext, useState, useContext } from 'react';
import { useDataContext } from './DataContext';

export interface EditingInfo {
  editingContentBefore: EditingContent | undefined;
  editingContentAfter: EditingContent | undefined;
  createEditingContentInfo: (id: number) => void;
  clearEditingContentInfo: () => void;
  updateEditingContentAfter: (commentID: number, text: string) => void;
  isChanged: () => void;
  overwriteData: () => void;
}

export interface EditingContent {
  id: number;
  body: string;
  comments: { id: number; body: string }[];
}

const EditingInfoContext = createContext<EditingInfo | null>(null);

export function useEditingInfoContext() {
  return useContext(EditingInfoContext);
}

export function EditingInfoProvider({ children }: { children: any }) {
  const data = useDataContext();
  const [editingContentBefore, setEditingContentBefore] = useState<EditingContent | undefined>(
    undefined,
  );
  const [editingContentAfter, setEditingContentAfter] = useState<EditingContent | undefined>(
    undefined,
  );

  function createEditingContentInfo(id: number) {
    const targetContent = data?.data.find((d) => d.id === id);
    if (targetContent === undefined) return;
    const commentBefore = targetContent.comments.map((comment) => {
      return {
        id: comment.id,
        body: comment.body,
      };
    });
    const commentAfter = targetContent.comments.map((comment) => {
      return {
        id: comment.id,
        body: comment.body,
      };
    });

    const contentBefore = {
      id: targetContent.id,
      body: targetContent.body,
      comments: commentBefore,
    };

    const contentAfter = {
      id: targetContent.id,
      body: targetContent.body,
      comments: commentAfter,
    };

    setEditingContentBefore(contentBefore);
    setEditingContentAfter(contentAfter);
  }

  function clearEditingContentInfo() {
    setEditingContentBefore(undefined);
    setEditingContentAfter(undefined);
  }

  const updateEditingContentAfter = (commentID: number, text: string) => {
    if (commentID === -1) {
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
    if (!isChanged || editingContentAfter === undefined) return;
    data?.updateAllData(editingContentAfter);
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
