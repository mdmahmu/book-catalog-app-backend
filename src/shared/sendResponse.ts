import { Response } from 'express';

export type ResponseType<T> = {
  success: boolean;
  statusCode: number;
  message: string | null;
  meta?: {
    page?: number;
    limit?: number;
    count?: number;
  };
  data?: T | null;
};

export type LoginResponse = {
  accessToken: string;
  refreshToken?: string;
};

export type MetaResponseType<T> = {
  meta: {
    page: number;
    limit: number;
    count: number;
  };
  data: T;
};

const sendResponse = <T>(res: Response, data: ResponseType<T>): void => {
  const responseData: ResponseType<T> = {
    success: data.success,
    statusCode: data.statusCode,
    message: data.message || null,
    meta: data.meta || undefined,
    data: data.data || undefined || null,
  };

  res.status(data.statusCode).json(responseData);
};

export default sendResponse;
