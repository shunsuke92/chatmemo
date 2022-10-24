import { createContext, useState, useContext } from 'react';

export interface Operation {
  addingContentID: number | undefined;
  editingContentID: number | undefined;
  scheduledScrolling: boolean;
  displayAlertDialog: AlertDialog;
  deleteID: number | undefined;
  selectedDisplayType: DisplayType;
  changeAddingContentID: (id: number | undefined) => void;
  changeEditingContentID: (id: number | undefined) => void;
  changeScheduledScrolling: (value: boolean) => void;
  changeDisplayAlertDialog: (value: AlertDialog, deleteID?: number) => void;
  changeSelectedDisplayType: (data: DisplayType) => void;
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
  const [addingContentID, setAddingContentID] = useState<number | undefined>(undefined);
  const [editingContentID, setEditingContentID] = useState<number | undefined>(undefined);
  const [scheduledScrolling, setScheduledScrolling] = useState<boolean>(false);
  const [displayAlertDialog, setDisplayAlertDialog] = useState<AlertDialog>('');
  const [deleteID, setDeleteID] = useState<number | undefined>(undefined);
  const [selectedDisplayType, setSelectedDisplayType] = useState<DisplayType>(DISPLAY_TYPE[0]);

  function changeAddingContentID(id: number | undefined) {
    setAddingContentID(id);
  }

  function changeEditingContentID(id: number | undefined) {
    setEditingContentID(id);
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

  function changeDisplayAlertDialog(value: AlertDialog, deleteID?: number) {
    setDisplayAlertDialog(value);
    if (value) {
      setDeleteID(deleteID);
    } else {
      setDeleteID(undefined);
    }
  }

  function changeSelectedDisplayType(data: DisplayType) {
    setSelectedDisplayType(data);
  }

  const info: Operation = {
    addingContentID: addingContentID,
    editingContentID: editingContentID,
    scheduledScrolling: scheduledScrolling,
    displayAlertDialog: displayAlertDialog,
    deleteID: deleteID,
    selectedDisplayType: selectedDisplayType,
    changeAddingContentID: changeAddingContentID,
    changeEditingContentID: changeEditingContentID,
    changeScheduledScrolling: changeScheduledScrolling,
    changeDisplayAlertDialog: changeDisplayAlertDialog,
    changeSelectedDisplayType: changeSelectedDisplayType,
  };

  return <OperationContext.Provider value={info}>{children}</OperationContext.Provider>;
}
