import express from 'express';
import { AuthRoutes } from '../modules/auth/auth.routes';

const mainRoutes = express.Router();

const moduleRoutes = [
  {
    path: '/auth',
    route: AuthRoutes,
  },
];

moduleRoutes.forEach(routeInfo =>
  mainRoutes.use(routeInfo.path, routeInfo.route),
);

export default mainRoutes;
