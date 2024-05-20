import { Router } from 'express';
import userController from '../controllers/users/userController';

const userRouter = Router();

userRouter.post('/user', userController.register);

export default userRouter;