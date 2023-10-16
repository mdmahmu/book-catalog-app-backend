import { Error } from 'mongoose';
import { ErrorInfoType, ErrorResponseType } from '../shared/errorTypes';

const handleValidationError = (
  error: Error.ValidationError,
): ErrorResponseType => {
  const errors: ErrorInfoType[] = Object.values(error.errors).map(
    (err: Error.ValidatorError | Error.CastError) => {
      return {
        path: err?.path,
        message: err?.message,
      };
    },
  );

  const statusCode = 400;

  return {
    statusCode,
    message: 'Validation Error',
    errorMessages: errors,
  };
};

export default handleValidationError;
