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
      publicationYear: z.number({
        required_error: 'Publication year is required.',
      }),
      reviews: z.array(z.string()).optional(),
      uploader: z.string({
        required_error: 'Uploader is required.',
      }),
    })
    .strict(),
});

const updateBookZodSchema = z.object({
  body: z
    .object({
      title: z.string().optional(),
      author: z.string().optional(),
      genre: z.string().optional(),
      publicationYear: z.number().optional(),
      reviews: z.array(z.string()).optional(),
      uploader: z.string().optional(),
    })
    .strict()
    .refine(
      data => {
        return Object.keys(data).length > 0;
      },
      {
        message: 'At least one valid field is required to update.',
      },
    ),
});

export const BookValidations = {
  createBookZodSchema,
  updateBookZodSchema,
};
