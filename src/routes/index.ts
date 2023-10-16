import express from 'express';
import { UserRoutes } from '../modules/user/user.routes';

const mainRoutes = express.Router();

const moduleRoutes = [
  {
    path: '/users',
    route: UserRoutes,
  },
];

moduleRoutes.forEach(routeInfo =>
  mainRoutes.use(routeInfo.path, routeInfo.route),
);

export default mainRoutes;
