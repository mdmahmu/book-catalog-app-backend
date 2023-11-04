import { RequestHandler } from 'express';
import catchAsync from '../../shared/catchAsync';
import { BookServices } from './book.services';
import sendResponse from '../../shared/sendResponse';
import { BookType } from './book.types';
import {
  BookFilterableFieldsType,
  PaginationOptionsType,
  bookFilterableFields,
  paginationFields,
} from '../../shared/pagination';
import pick from '../../shared/pick';

const createBook: RequestHandler = catchAsync(async (req, res) => {
  const bookData = req.body;
  const result = await BookServices.createBookDB(bookData);

  sendResponse<BookType>(res, {
    success: true,
    statusCode: 201,
    message: 'Book created successfully.',
    data: result,
  });
});

const getAllBooks: RequestHandler = catchAsync(async (req, res) => {
  const filters: BookFilterableFieldsType = pick(
    req.query,
    bookFilterableFields,
  );
  const paginationOptions: PaginationOptionsType = pick(
    req.query,
    paginationFields,
  );

  const result = await BookServices.getAllBooksDB(filters, paginationOptions);

  if (
    result.data != undefined &&
    result.data != null &&
    result.data.length > 0
  ) {
    sendResponse<BookType[]>(res, {
      success: true,
      statusCode: 200,
      message: 'Books retrieved successfully.',
      meta: result.meta,
      data: result.data,
    });
  } else {
    sendResponse<null>(res, {
      success: false,
      statusCode: 404,
      message: 'No book found.',
      data: null,
    });
  }
});

export const BookControllers = {
  createBook,
  getAllBooks,
};
