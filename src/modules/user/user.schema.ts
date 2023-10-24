import { Schema } from 'mongoose';
import { UserType } from './user.types';
import { gender } from './user.constants';
import { hash } from 'bcrypt';
import { configData } from '../../configuration/dotenv.config';

export const userSchema = new Schema<UserType>(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      enum: gender,
      required: true,
    },
    birthday: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  },
);

userSchema.pre('save', async function (next) {
  // password hashing
  this.password = await hash(this.password, configData.bcrypt_salt_rounds);

  next();
});
