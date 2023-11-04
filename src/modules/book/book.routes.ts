import { Router } from 'express';
import { BookControllers } from './book.controllers';
import validateRequest from '../../middlewares/validateRequest';
import { BookValidations } from './book.validations';

const router = Router();

router.post(
  '/',
  validateRequest(BookValidations.createBookZodSchema),
  BookControllers.createBook,
);

export const BookRoutes = router;
