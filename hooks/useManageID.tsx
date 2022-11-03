import { useRef } from 'react';

interface ManageID {
  tentativeID: string;
  confirmedID: number | undefined;
}

export const useManageID = () => {
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

  return functions;
};
