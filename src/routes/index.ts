import express from 'express';
import { AuthRoutes } from '../modules/auth/auth.routes';
import { UserRoutes } from '../modules/user/user.routes';
import { BookRoutes } from '../modules/book/book.routes';

const mainRoutes = express.Router();

const moduleRoutes = [
  {
    path: '/auth',
    route: AuthRoutes,
  },
  {
    path: '/users',
    route: UserRoutes,
  },
  {
    path: '/books',
    route: BookRoutes,
  },
];

moduleRoutes.forEach(routeInfo =>
  mainRoutes.use(routeInfo.path, routeInfo.route),
);

export default mainRoutes;
