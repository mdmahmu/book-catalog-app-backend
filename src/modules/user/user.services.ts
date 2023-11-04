import ApiError from '../../errors/ApiError';
import { User } from './user.model';
import { UserType } from './user.types';

const getAllUsersDB = async (): Promise<UserType[]> => {
  const allUsers = await User.find({});
  return allUsers;
};

const getSingleUserDB = async (id: string): Promise<UserType | null> => {
  const user = await User.findById(id);
  if (!user) {
    throw new ApiError(404, `No user found.`);
  }
  return user;
};

const updateUserInfoDB = async (
  id: string,
  payload: Partial<UserType>,
): Promise<UserType> => {
  const isExist = await User.findById(id);
  if (!isExist) {
    throw new ApiError(404, `User doesn't exist. Update operation failed.`);
  }

  const updatedUser = await User.findByIdAndUpdate({ _id: id }, payload, {
    new: true,
  });
  return updatedUser!;
};

const deleteUserDB = async (id: string): Promise<UserType> => {
  const userExist = await User.findById(id);
  if (!userExist) {
    throw new ApiError(404, `User doesn't exist. Delete operation failed.`);
  }
  const deletedUser = await User.findByIdAndDelete(id);
  return deletedUser!;
};

export const UserServices = {
  getAllUsersDB,
  getSingleUserDB,
  updateUserInfoDB,
  deleteUserDB,
};
