import { Router } from 'express';
import HomeController from '../controllers/homeController';

const homeRouter = Router();

homeRouter.get('/', HomeController.home);
homeRouter.get('/login', HomeController.login);
homeRouter.get('/search', HomeController.search);
homeRouter.get('/watch', HomeController.watching);

export default homeRouter;