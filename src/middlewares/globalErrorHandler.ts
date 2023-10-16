import { ErrorRequestHandler } from 'express';
import app from '../app';
import handleValidationError from '../errors/handleValidationError';
import { ErrorInfoType } from '../shared/errorTypes';
import ApiError from '../errors/ApiError';
import { ZodError } from 'zod';
import handleZodError from '../errors/handleZodError';
import handleCastError from '../errors/handleCastError';

const globalErrorHandler: ErrorRequestHandler = (error, req, res, next) => {
  let statusCode = 500;
  let message = 'Something went wrong!';
  let errorMessages: ErrorInfoType[] = [];

  console.log('Error = ', error);

  if (error instanceof ZodError) {
    const simplifiedError = handleZodError(error);
    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
    errorMessages = simplifiedError.errorMessages;
  } else if (error?.name === 'MongoServerError' && error.code === 11000) {
    statusCode = 400;
    message = error?.message;
    errorMessages = [
      {
        path: Object.keys(error.keyPattern)[0] || '',
        message,
      },
    ];
  } else if (error?.name === 'ValidationError') {
    const simplifiedError = handleValidationError(error);
    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
    errorMessages = simplifiedError.errorMessages;
  } else if (error?.name === 'CastError') {
    const simplifiedError = handleCastError(error);
    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
    errorMessages = simplifiedError.errorMessages;
  } else if (error instanceof ApiError) {
    statusCode = error?.statusCode;
    message = error?.message;
    errorMessages = [
      {
        path: '',
        message: error.message,
      },
    ];
  } else if (error instanceof Error) {
    message = error?.message;
    errorMessages = error?.message
      ? [
          {
            path: '',
            message: error?.message,
          },
        ]
      : [];
  }

  res.status(statusCode).json({
    success: false,
    message,
    errorMessages,
    stack: app.get('env') === 'development' ? error?.stack : undefined,
  });
};

export default globalErrorHandler;
