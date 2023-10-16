import { ZodError, ZodIssue } from 'zod';
import { ErrorInfoType, ErrorResponseType } from '../shared/errorTypes';

const handleZodError = (error: ZodError): ErrorResponseType => {
  const errors: ErrorInfoType[] = error.issues.map((err: ZodIssue) => {
    return {
      path: err.path[1],
      message: err.message,
    };
  });

  const statusCode = 400;

  return {
    statusCode,
    message: 'Validation Error',
    errorMessages: errors,
  };
};

export default handleZodError;
