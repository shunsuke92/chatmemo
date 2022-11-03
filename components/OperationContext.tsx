import { createContext, useState, useContext, useEffect } from 'react';

export interface Operation {
  addingContentID: string | undefined;
  editingContentID: string | undefined;
  scheduledScrolling: boolean;
  displayAlertDialog: AlertDialog;
  deleteID: string | undefined;
  selectedDisplayType: DisplayType;
  isSynchronizing: boolean;
  synchronizingProgress: number;
  changeAddingContentID: (id: string) => void;
  clearAddingContentID: () => void;
  changeEditingContentID: (id: string) => void;
  clearEditingContentID: () => void;
  changeScheduledScrolling: (value: boolean) => void;
  changeDisplayAlertDialog: (value: AlertDialog, deleteID?: string) => void;
  clearDisplayAlertDialog: () => void;
  changeSelectedDisplayType: (data: DisplayType) => void;
  changeIsSynchronizing: (value: boolean) => void;
  changeSynchronizingProgress: (value: number) => void;
}

export interface DisplayType {
  id: number;
  name: string;
}

export const DISPLAY_TYPE: DisplayType[] = [
  { id: 1, name: 'すべてのメモ' },
  { id: 2, name: '実行済み' },
  { id: 3, name: 'ごみ箱' },
];

type AlertDialog = 'delete-memo' | 'delete-account' | 'complete-deletion-memo' | '';

const OperationContext = createContext<Operation | null>(null);

export function useOperationContext() {
  return useContext(OperationContext);
}

export function OperationProvider({ children }: { children: any }) {
  const [addingContentID, setAddingContentID] = useState<string>('');
  const [editingContentID, setEditingContentID] = useState<string>('');
  const [scheduledScrolling, setScheduledScrolling] = useState<boolean>(false);
  const [displayAlertDialog, setDisplayAlertDialog] = useState<AlertDialog>('');
  const [deleteID, setDeleteID] = useState<string>('');
  const [selectedDisplayType, setSelectedDisplayType] = useState<DisplayType>(DISPLAY_TYPE[0]);
  const [isSynchronizing, setIsSynchronizing] = useState(false);
  const [synchronizingProgress, setSynchronizingProgress] = useState(0);

  function changeAddingContentID(id: string) {
    setAddingContentID(id);
  }

  function clearAddingContentID() {
    setAddingContentID('');
  }

  function changeEditingContentID(id: string) {
    setEditingContentID(id);
  }

  function clearEditingContentID() {
    setEditingContentID('');
  }

  function changeScheduledScrolling(value: boolean) {
    setScheduledScrolling(value);

    // 使用後は常時オフになるようにする
    if (value) {
      setTimeout(() => {
        setScheduledScrolling(false);
      }, 100);
    }
  }

  const changeDisplayAlertDialog = (value: AlertDialog, deleteID?: string) => {
    setDisplayAlertDialog(value);
    if (deleteID !== undefined) {
      setDeleteID(deleteID);
    } else {
      setDeleteID('');
    }
  };

  const clearDisplayAlertDialog = () => {
    setDisplayAlertDialog('');
  };

  function changeSelectedDisplayType(data: DisplayType) {
    setSelectedDisplayType(data);
  }

  function changeIsSynchronizing(value: boolean) {
    setIsSynchronizing(value);
  }

  function changeSynchronizingProgress(value: number) {
    setSynchronizingProgress(value);
  }

  const info: Operation = {
    addingContentID: addingContentID,
    editingContentID: editingContentID,
    scheduledScrolling: scheduledScrolling,
    displayAlertDialog: displayAlertDialog,
    deleteID: deleteID,
    selectedDisplayType: selectedDisplayType,
    isSynchronizing: isSynchronizing,
    synchronizingProgress: synchronizingProgress,
    changeAddingContentID: changeAddingContentID,
    clearAddingContentID: clearAddingContentID,
    changeEditingContentID: changeEditingContentID,
    clearEditingContentID: clearEditingContentID,
    changeScheduledScrolling: changeScheduledScrolling,
    changeDisplayAlertDialog: changeDisplayAlertDialog,
    clearDisplayAlertDialog: clearDisplayAlertDialog,
    changeSelectedDisplayType: changeSelectedDisplayType,
    changeIsSynchronizing: changeIsSynchronizing,
    changeSynchronizingProgress: changeSynchronizingProgress,
  };

  return <OperationContext.Provider value={info}>{children}</OperationContext.Provider>;
}
