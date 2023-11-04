import { Book } from './book.model';
import { bookType } from './book.types';

const createBookDB = async (bookData: bookType) => {
  const createdBook = await Book.create(bookData);
  return createdBook;
};

export const BookServices = {
  createBookDB,
};
