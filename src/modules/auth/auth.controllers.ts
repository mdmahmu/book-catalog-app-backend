import { RequestHandler } from 'express';
import catchAsync from '../../shared/catchAsync';
import { AuthServices } from './auth.services';
import sendResponse, { LoginResponse } from '../../shared/sendResponse';
import { UserType } from '../user/user.types';
import { configData } from '../../configuration/dotenv.config';

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

const loginUser: RequestHandler = catchAsync(async (req, res) => {
  const { ...loginData } = req.body;
  const result = await AuthServices.loginUserDb(loginData);
  const { refreshToken, ...others } = result;

  // set refresh token into cookie
  const cookieOptions = {
    secure: configData.target_environment === 'production',
    httpOnly: true,
  };
  res.cookie('refreshToken', refreshToken, cookieOptions);

  sendResponse<LoginResponse>(res, {
    success: true,
    statusCode: 200,
    message: 'User logged in successfully.',
    data: others,
  });
});

const refreshToken: RequestHandler = catchAsync(async (req, res) => {
  const { refreshToken } = req.cookies;
  const result = await AuthServices.refreshTokenVerify(refreshToken);

  // set refresh token into cookie
  const cookieOptions = {
    secure: configData.target_environment === 'production',
    httpOnly: true,
  };
  res.cookie('refreshToken', refreshToken, cookieOptions);

  sendResponse<LoginResponse>(res, {
    success: true,
    statusCode: 200,
    message: 'A new access token is generated successfully.',
    data: result,
  });
});

export const AuthControllers = {
  signUpUser,
  loginUser,
  refreshToken,
};
