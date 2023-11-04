import { configData } from '../../configuration/dotenv.config';
import ApiError from '../../errors/ApiError';
import { jwtTokens } from '../../shared/jwtTokens';
import { LoginResponse } from '../../shared/sendResponse';
import { User } from '../user/user.model';
import { UserType } from '../user/user.types';
import { LoginDataType } from './auth.types';

const signUpUserDb = async (user: UserType): Promise<UserType> => {
  const signedUpUser = await User.create(user);
  const tempUser = signedUpUser.toJSON();
  tempUser.password = '';
  return tempUser;
};

const loginUserDb = async (
  loginData: LoginDataType,
): Promise<LoginResponse> => {
  const { email, password } = loginData;
  const user = await User.isUserExist(email);
  if (!user) {
    throw new ApiError(404, 'User does not exist.');
  }

  if (!(await User.isPasswordMatched(password, user.password))) {
    throw new ApiError(401, 'Password is incorrect.');
  }

  // creating access token and refresh token
  const accessToken = jwtTokens.createToken(
    { email },
    configData.jwt.access_secret,
    configData.jwt.access_expires_in,
  );

  const refreshToken = jwtTokens.createToken(
    { email },
    configData.jwt.refresh_secret,
    configData.jwt.refresh_expires_in,
  );

  return {
    accessToken,
    refreshToken,
  };
};

const refreshTokenVerify = async (token: string): Promise<LoginResponse> => {
  let verifiedToken = null;

  try {
    verifiedToken = jwtTokens.verifyToken(token, configData.jwt.refresh_secret);
  } catch (error) {
    throw new ApiError(403, 'Invalid refresh token.');
  }
  const { email } = verifiedToken;
  const isUserExist = await User.isUserExist(email);
  if (!isUserExist) {
    throw new ApiError(404, 'User does not exist.');
  }

  const newAccessToken = jwtTokens.createToken(
    { email },
    configData.jwt.access_secret,
    configData.jwt.access_expires_in,
  );

  return {
    accessToken: newAccessToken,
  };
};

export const AuthServices = {
  signUpUserDb,
  loginUserDb,
  refreshTokenVerify,
};
