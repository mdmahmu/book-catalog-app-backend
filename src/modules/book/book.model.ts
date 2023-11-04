import { model } from 'mongoose';
import { bookType } from './book.types';
import { bookSchema } from './book.schema';

export const Book = model<bookType>('Book', bookSchema);
