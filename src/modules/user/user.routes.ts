import express from 'express';
import { UserControllers } from './user.controllers';
import validateRequest from '../../middlewares/validateRequest';
import { userValidations } from './user.validations';

const router = express.Router();

router.get('/:id', UserControllers.getSingleUser);
router.patch(
  '/:id',
  validateRequest(userValidations.updateUserZodSchema),
  UserControllers.updateUserInfo,
);
router.delete('/:id', UserControllers.deleteUser);
router.get('/', UserControllers.getAllUsers);

export const UserRoutes = router;
