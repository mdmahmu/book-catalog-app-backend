import { ObjectId } from 'mongoose';

export type BookType = {
  title: string;
  author: string;
  genre: string;
  publicationYear: number;
  reviews: string[];
  uploader: ObjectId;
};
