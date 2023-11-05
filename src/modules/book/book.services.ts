import { SortOrder } from 'mongoose';
import {
  BookFilterableFieldsType,
  PaginationOptionsType,
  bookSearchableFields,
  calculatePagination,
} from '../../shared/pagination';
import { Book } from './book.model';
import { BookType } from './book.types';
import { MetaResponseType } from '../../shared/sendResponse';
import ApiError from '../../errors/ApiError';

const createBookDB = async (bookData: BookType) => {
  const createdBook = await Book.create(bookData);
  return createdBook;
};

const getAllBooksDB = async (
  filters: BookFilterableFieldsType,
  paginationOptions: PaginationOptionsType,
): Promise<MetaResponseType<BookType[]>> => {
  const { searchTerm, ...filtersData } = filters;
  const paginationData = calculatePagination(paginationOptions);
  const { page, limit, skip, sortBy, sortOrder } = paginationData;

  const andConditions = [];
  if (searchTerm) {
    andConditions.push({
      $or: bookSearchableFields.map(field => ({
        [field]: {
          $regex: searchTerm,
          $options: 'i',
        },
      })),
    });
  }

  if (filtersData.genre) {
    andConditions.push({
      $and: [
        {
          genre: {
            $regex: filtersData.genre,
            $options: 'i',
          },
        },
      ],
    });
  }

  if (filtersData.publicationYear) {
    andConditions.push({
      $and: [
        {
          publicationYear: {
            $regex: filtersData.publicationYear,
            $options: 'i',
          },
        },
      ],
    });
  }

  const whereConditions =
    andConditions.length > 0 ? { $and: andConditions } : {};

  const sortCondition: { [key: string]: SortOrder } = {};
  sortCondition[sortBy] = sortOrder;

  const allBooks = await Book.find(whereConditions)
    .sort(sortCondition)
    .skip(skip)
    .limit(limit);

  const count = await Book.countDocuments(whereConditions);

  return {
    meta: {
      page,
      limit,
      count,
    },
    data: allBooks,
  };
};

const getSingleBookDB = async (id: string): Promise<BookType> => {
  const singleBook = await Book.findById(id);
  if (!singleBook) {
    throw new ApiError(404, 'No book found.');
  }
  return singleBook;
};

const updateBookInfoDB = async (
  id: string,
  payload: Partial<BookType>,
): Promise<BookType | null> => {
  const isExist = await Book.findById(id);
  if (!isExist) {
    throw new ApiError(404, `Book doesn't exist. Update operation failed.`);
  }

  const updatedBook = await Book.findByIdAndUpdate({ _id: id }, payload, {
    new: true,
  });

  return updatedBook;
};

const deleteBookDB = async (id: string): Promise<BookType> => {
  const deletedBook = await Book.findByIdAndDelete(id);
  if (!deletedBook) {
    throw new ApiError(404, `Book doesn't exist. Delete operation failed.`);
  }
  return deletedBook;
};

export const BookServices = {
  createBookDB,
  getAllBooksDB,
  getSingleBookDB,
  updateBookInfoDB,
  deleteBookDB,
};
