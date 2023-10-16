import { User } from '../user/user.model';
import { UserType } from '../user/user.types';

const signUpUserDb = async (user: UserType): Promise<UserType> => {
  const signedUpUser = await User.create(user);
  return signedUpUser;
};

export const AuthServices = {
  signUpUserDb,
};
