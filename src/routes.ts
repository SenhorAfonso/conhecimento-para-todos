import { Router } from 'express';
import userController from './controllers/users/userController';

const routes = Router();

routes.post('/user', userController.register);

export {
  routes
};