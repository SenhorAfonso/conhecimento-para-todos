import { Router } from 'express';
import HomeController from '../controllers/homeController';
import AuthenticationMiddleware from '../middleware/AuthenticationMiddleware';

const homeRouter = Router();

homeRouter.get('/home', HomeController.home);
homeRouter.get('/login', HomeController.login);
homeRouter.get('/register', HomeController.login);
homeRouter.get('/search', HomeController.search);
homeRouter.get('/watch', HomeController.watching);

export default homeRouter;