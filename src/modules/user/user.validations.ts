import { z } from 'zod';
import { gender, statusList } from './user.constants';

const updateUserZodSchema = z.object({
  body: z
    .object({
      name: z.string().optional(),
      email: z.string().email('Must be a valid email address.').optional(),
      password: z.string().optional(),
      gender: z.enum([...gender] as [string, ...string[]]).optional(),
      phoneNumber: z.string().optional(),
      birthday: z.string().optional(),
      bookList: z
        .array(
          z.object({
            bookId: z.string().optional(),
            status: z.enum([...statusList] as [string, ...string[]]).optional(),
          }),
        )
        .optional(),
    })
    .strict() // body ke strict korte hobe. taile wrong field diye data update korte gele error dibe. body er baire korle hobe na.
    .refine(
      data => {
        return Object.keys(data).length > 0;
      },
      {
        message: 'At least one valid field is required to update.',
      },
    ),
});

export const userValidations = {
  updateUserZodSchema,
};
