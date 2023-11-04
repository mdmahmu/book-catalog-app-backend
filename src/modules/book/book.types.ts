import { ObjectId } from 'mongoose';

export type BookType = {
  title: string;
  author: string;
  genre: string;
  publicationYear: string;
  reviews: string[];
  uploader: ObjectId;
};
