import { gender } from './user.constants';

export type GenderType = keyof typeof gender;

export type UserType = {
  name: string;
  email: string;
  password: string;
  gender: GenderType;
  birthday: string;
};
