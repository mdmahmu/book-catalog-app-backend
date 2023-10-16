import { model } from 'mongoose';
import { UserType } from './user.types';
import { userSchema } from './user.schema';

export const User = model<UserType>('User', userSchema);
