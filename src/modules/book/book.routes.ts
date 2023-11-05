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

router.get('/:id', BookControllers.getSingleBook);
router.patch(
  '/:id',
  validateRequest(BookValidations.updateBookZodSchema),
  BookControllers.updateBookInfo,
);
router.delete('/:id', BookControllers.deleteBook);

router.get('/', BookControllers.getAllBooks);

export const BookRoutes = router;
