import { model } from 'mongoose';
import { UserModel, UserType } from './user.types';
import { userSchema } from './user.schema';

export const User = model<UserType, UserModel>('User', userSchema);
