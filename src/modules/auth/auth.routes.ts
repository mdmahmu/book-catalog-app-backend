import { Router } from 'express';
import { AuthControllers } from './auth.controllers';
import validateRequest from '../../middlewares/validateRequest';
import { AuthValidations } from './auth.validations';

const router = Router();

router.post(
  '/signup',
  validateRequest(AuthValidations.signUpUserZodSchema),
  AuthControllers.signUpUser,
);

router.post(
  '/login',
  validateRequest(AuthValidations.loginUserZodSchema),
  AuthControllers.loginUser,
);

router.post(
  '/refresh-token',
  validateRequest(AuthValidations.refreshTokenZodSchema),
  AuthControllers.refreshToken,
);

export const AuthRoutes = router;
