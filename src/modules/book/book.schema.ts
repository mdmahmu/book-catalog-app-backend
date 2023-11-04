import { Schema, Types } from 'mongoose';
import { bookType } from './book.types';

export const bookSchema = new Schema<bookType>(
  {
    title: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    genre: {
      type: String,
      required: true,
    },
    publication_date: {
      type: String,
      required: true,
    },
    reviews: {
      type: [String],
      required: true,
    },
    uploader: {
      type: Types.ObjectId,
      required: true,
      ref: 'User',
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  },
);
