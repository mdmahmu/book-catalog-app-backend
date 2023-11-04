import { ObjectId } from 'mongoose';

export type bookType = {
  title: string;
  author: string;
  genre: string;
  publication_date: string;
  reviews: string[];
  uploader: ObjectId;
};
