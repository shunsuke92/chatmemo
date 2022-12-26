import { createContext, useContext, useRef } from 'react';

export interface ManageTentativeID {
  createManageID: (tentativeID: string) => void;
  setConfirmedID: (tentativeID: string, confirmedID: number) => void;
  getConfirmedID: (tentativeID: string) => number | undefined;
}

interface ManageID {
  tentativeID: string;
  confirmedID: number | undefined;
}

const ManageTentativeIDContext = createContext<ManageTentativeID | null>(null);

export function useManageTentativeIDContext() {
  return useContext(ManageTentativeIDContext);
}

export function ManageTentativeIDProvider({ children }: { children: any }) {
  const manageID = useRef<ManageID[]>([]);

  const createManageID = (tentativeID: string) => {
    manageID.current.push({ tentativeID: tentativeID, confirmedID: undefined });
  };

  const setConfirmedID = (tentativeID: string, confirmedID: number) => {
    const targetManageID = manageID.current.find((m) => m.tentativeID === tentativeID);
    if (targetManageID === undefined) return;

    targetManageID.confirmedID = confirmedID;
  };

  const getConfirmedID = (tentativeID: string): number | undefined => {
    const targetManageID = manageID.current.find((m) => m.tentativeID === tentativeID);
    if (targetManageID === undefined) return;

    return { ...targetManageID }.confirmedID;
  };

  const functions = {
    createManageID: createManageID,
    setConfirmedID: setConfirmedID,
    getConfirmedID: getConfirmedID,
  };

  return (
    <ManageTentativeIDContext.Provider value={functions}>
      {children}
    </ManageTentativeIDContext.Provider>
  );
}
