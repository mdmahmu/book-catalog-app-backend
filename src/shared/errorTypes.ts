export type ErrorInfoType = {
  path: string | number;
  message: string;
};

export type ErrorResponseType = {
  statusCode: number;
  message: string;
  errorMessages: ErrorInfoType[];
};
