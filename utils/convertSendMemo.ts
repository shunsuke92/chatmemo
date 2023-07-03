import { Memo } from '../types/index';

interface SendMemo {
  body: string;
  createdAt: string;
  updatedAt: string;
  completed: boolean;
  completedAt: string;
  deleted: boolean;
  deletedAt: string;
}

export const convertSendMemo = (data: Memo): SendMemo => {
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
