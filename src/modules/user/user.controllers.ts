import { RequestHandler } from 'express';
import catchAsync from '../../shared/catchAsync';
import { UserServices } from './user.services';
import sendResponse from '../../shared/sendResponse';
import { UserType } from './user.types';

const getAllUsers: RequestHandler = catchAsync(async (req, res) => {
  const result = await UserServices.getAllUsersDB();

  if (result.length > 0) {
    sendResponse<UserType[]>(res, {
      success: true,
      statusCode: 200,
      message: 'Users retrieved successfully.',
      data: result,
    });
  } else {
    sendResponse<null>(res, {
      success: false,
      statusCode: 404,
      message: 'No user found.',
      data: null,
    });
  }
});

const getSingleUser: RequestHandler = catchAsync(async (req, res) => {
  const id = req.params.id;
  const result = await UserServices.getSingleUserDB(id);

  sendResponse<UserType>(res, {
    success: true,
    statusCode: 200,
    message: 'User retrieved successfully.',
    data: result,
  });
});

const updateUserInfo: RequestHandler = catchAsync(async (req, res) => {
  const id = req.params.id;
  const dataToUpdate: Partial<UserType> = req.body;
  const result = await UserServices.updateUserInfoDB(id, dataToUpdate);

  sendResponse<UserType>(res, {
    success: true,
    statusCode: 200,
    message: 'User updated successfully.',
    data: result,
  });
});

const deleteUser: RequestHandler = catchAsync(async (req, res) => {
  const id = req.params.id;
  const result = await UserServices.deleteUserDB(id);
  sendResponse<UserType>(res, {
    success: true,
    statusCode: 200,
    message: 'User deleted successfully.',
    data: result,
  });
});

export const UserControllers = {
  getAllUsers,
  getSingleUser,
  updateUserInfo,
  deleteUser,
};
