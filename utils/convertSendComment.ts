import { Comment } from '../types/index';

interface SendComment {
  body: string;
  createdAt: string;
  updatedAt: string;
}

export const convertSendComment = (data: Comment): SendComment => {
  const sendData = {
    body: data.body,
    createdAt: data.createdAt,
    updatedAt: data.updatedAt,
    deleted: data.deleted,
    deletedAt: data.deletedAt,
  };
  return sendData;
};
