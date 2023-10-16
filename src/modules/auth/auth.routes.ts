import { Router } from 'express';
import { AuthControllers } from './auth.controllers';

const router = Router();

router.post('/signup', AuthControllers.signUpUser);

export const AuthRoutes = router;
