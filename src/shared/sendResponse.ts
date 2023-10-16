import { Response } from 'express';

export type ResponseType<T> = {
  success: boolean;
  statusCode: number;
  message: string | null;
  data?: T | null;
};

const sendResponse = <T>(res: Response, data: ResponseType<T>): void => {
  const responseData: ResponseType<T> = {
    success: data.success,
    statusCode: data.statusCode,
    message: data.message || null,
    data: data.data || undefined || null,
  };

  res.status(data.statusCode).json(responseData);
};

export default sendResponse;
