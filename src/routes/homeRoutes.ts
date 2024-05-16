import { Router } from 'express';
import HomeController from '../controllers/homeController';

const homeRouter = Router();

homeRouter.get('/', HomeController.home);
homeRouter.get('/search', HomeController.search);

export default homeRouter;