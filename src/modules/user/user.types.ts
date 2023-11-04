import { Model } from 'mongoose';
import { gender } from './user.constants';

export type GenderType = keyof typeof gender;

export type UserType = {
  name: string;
  email: string;
  password: string;
  gender: GenderType;
  birthday: string;
};

export type UserModel = {
  isUserExist(email: string): Promise<Pick<UserType, 'email' | 'password'>>;
  isPasswordMatched(
    givenPassword: string,
    savedPassword: string,
  ): Promise<boolean>;
} & Model<UserType>;
