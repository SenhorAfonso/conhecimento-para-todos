import { Router } from 'express';
import userController from '../controllers/users/userController';
import AuthenticationMiddleware from '../middleware/AuthenticationMiddleware';

const userRouter = Router();

userRouter.post('/register', userController.register);
userRouter.post('/login', userController.login);
userRouter.get('/populate', userController.populate);
userRouter.get('/profile', AuthenticationMiddleware.AuthenticateToken, userController.profile);
userRouter.get('/profile/update', AuthenticationMiddleware.AuthenticateToken, userController.updateProfile);

export default userRouter;