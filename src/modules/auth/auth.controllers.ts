import { RequestHandler } from 'express';
import catchAsync from '../../shared/catchAsync';
import { AuthServices } from './auth.services';
import sendResponse from '../../shared/sendResponse';
import { UserType } from '../user/user.types';

const signUpUser: RequestHandler = catchAsync(async (req, res) => {
  const { ...user } = req.body;
  const result = await AuthServices.signUpUserDb(user);

  sendResponse<UserType>(res, {
    success: true,
    statusCode: 201,
    message: 'User created successfully.',
    data: result,
  });
});

export const AuthControllers = {
  signUpUser,
};
