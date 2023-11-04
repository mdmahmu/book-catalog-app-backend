import { SortOrder } from 'mongoose';

export type PaginationOptionsType = {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: SortOrder;
};

export type BookFilterableFieldsType = {
  searchTerm?: string;
  genre?: string;
  publicationYear?: number;
};

export type OptionsResultType = {
  page: number;
  limit: number;
  skip: number;
  sortBy: string;
  sortOrder: SortOrder;
};

export const paginationFields = ['page', 'limit', 'sortBy', 'sortOrder'];
export const bookSearchableFields = ['title', 'author', 'genre'];
export const bookFilterableFields = ['searchTerm', 'genre', 'publicationYear'];

export const calculatePagination = (
  options: PaginationOptionsType,
): OptionsResultType => {
  const page = Number(options?.page) || 1;
  const limit = Number(options?.limit) || 10;
  const skip = (page - 1) * limit;

  const sortBy = options?.sortBy || 'createdAt';
  const sortOrder = options?.sortOrder || 'desc';

  return {
    page,
    limit,
    skip,
    sortBy,
    sortOrder,
  };
};
