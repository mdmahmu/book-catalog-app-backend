import { z } from 'zod';
import { gender } from '../user/user.constants';

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
