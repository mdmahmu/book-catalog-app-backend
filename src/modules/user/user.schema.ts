import { Schema } from 'mongoose';
import { UserType } from './user.types';
import { gender } from './user.constants';
import { compare, hash } from 'bcrypt';
import { configData } from '../../configuration/dotenv.config';
import { User } from './user.model';

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
      select: false,
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

userSchema.statics.isUserExist = async function (email: string) {
  return await User.findOne({ email }, { email: 1, password: 1 });
};

userSchema.statics.isPasswordMatched = async function (
  givenPassword: string,
  savedPassword: string,
) {
  return compare(givenPassword, savedPassword);
};

userSchema.pre('save', async function (next) {
  // password hashing
  this.password = await hash(this.password, configData.bcrypt_salt_rounds);

  next();
});
