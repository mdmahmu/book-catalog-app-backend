import { z } from 'zod';
import { gender, statusList } from '../user/user.constants';

export const BookZodSchema = z.object({
  bookId: z.string(),
  status: z.enum([...statusList] as [string, ...string[]]),
});

const signUpUserZodSchema = z.object({
  body: z
    .object({
      name: z.string({
        required_error: 'Name is required.',
      }),
      email: z
        .string({
          required_error: 'Email is required.',
        })
        .email('Must be a valid email address.'),
      password: z.string({
        required_error: 'Password is required.',
      }),
      gender: z.enum([...gender] as [string, ...string[]], {
        required_error: 'Gender is required.',
      }),
      birthday: z.string({
        required_error: 'Birthday is required.',
      }),
      bookList: z.array(BookZodSchema).optional(),
    })
    .strict(),
});

const loginUserZodSchema = z.object({
  body: z
    .object({
      email: z
        .string({
          required_error: 'Email is required.',
        })
        .email('Must be a valid email address.'),
      password: z.string({
        required_error: 'Password is required.',
      }),
    })
    .strict(),
});

const refreshTokenZodSchema = z.object({
  cookies: z
    .object({
      refreshToken: z.string({
        required_error: 'Refresh token is required.',
      }),
    })
    .strict(),
});

export const AuthValidations = {
  signUpUserZodSchema,
  loginUserZodSchema,
  refreshTokenZodSchema,
};
