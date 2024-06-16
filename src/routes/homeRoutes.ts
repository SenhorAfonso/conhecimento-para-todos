import { Router } from 'express';
import HomeController from '../controllers/homeController';
import AuthenticationMiddleware from '../middleware/AuthenticationMiddleware';

const homeRouter = Router();

homeRouter.get('/home', [
  AuthenticationMiddleware.AuthenticateToken
], HomeController.home);

homeRouter.get('/login', HomeController.login);
homeRouter.get('/register', HomeController.login);

homeRouter.get('/search', [
  AuthenticationMiddleware.AuthenticateToken
], HomeController.search);

homeRouter.get('/watch', [
  AuthenticationMiddleware.AuthenticateToken
], HomeController.watching);

export default homeRouter;