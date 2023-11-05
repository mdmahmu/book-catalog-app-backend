import { Model, ObjectId } from 'mongoose';
import { gender, statusList } from './user.constants';

export type GenderType = keyof typeof gender;

export type StatusType = keyof typeof statusList;

export type WishlistType = {
  bookId: ObjectId;
  status: StatusType;
};

export type UserType = {
  name: string;
  email: string;
  password: string;
  gender: GenderType;
  birthday: Date;
  bookList?: WishlistType[];
};

export type UserModel = {
  isUserExist(email: string): Promise<Pick<UserType, 'email' | 'password'>>;
  isPasswordMatched(
    givenPassword: string,
    savedPassword: string,
  ): Promise<boolean>;
} & Model<UserType>;
