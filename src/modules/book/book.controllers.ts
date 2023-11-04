import { RequestHandler } from 'express';
import catchAsync from '../../shared/catchAsync';
import { BookServices } from './book.services';
import sendResponse from '../../shared/sendResponse';
import { bookType } from './book.types';

const createBook: RequestHandler = catchAsync(async (req, res) => {
  const bookData = req.body;
  const result = await BookServices.createBookDB(bookData);

  sendResponse<bookType>(res, {
    success: true,
    statusCode: 201,
    message: 'Book created successfully.',
    data: result,
  });
});

export const BookControllers = {
  createBook,
};
