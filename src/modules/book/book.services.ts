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

export const BookServices = {
  createBookDB,
  getAllBooksDB,
};
