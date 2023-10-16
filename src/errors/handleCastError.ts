import { CastError } from 'mongoose';
import { ErrorInfoType, ErrorResponseType } from '../shared/errorTypes';

const handleCastError = (error: CastError): ErrorResponseType => {
  const statusCode = 400;
  const errors: ErrorInfoType[] = [
    {
      path: error?.path,
      message: error?.message,
    },
  ];

  return {
    statusCode,
    message: 'Cast Error.',
    errorMessages: errors,
  };
};

export default handleCastError;
