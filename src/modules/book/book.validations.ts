import { z } from 'zod';

const createBookZodSchema = z.object({
  body: z
    .object({
      title: z.string({
        required_error: 'Title is required.',
      }),
      author: z.string({
        required_error: 'Author is required.',
      }),
      genre: z.string({
        required_error: 'Genre is required.',
      }),
      publication_date: z.string({
        required_error: 'Publication date is required.',
      }),
      reviews: z.array(z.string()).optional(),
      uploader: z.string({
        required_error: 'Uploader is required.',
      }),
    })
    .strict(),
});

export const BookValidations = {
  createBookZodSchema,
};
