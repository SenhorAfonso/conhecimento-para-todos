// controller/users/userController.ts

import { Request, Response } from 'express';
import userService from '../../services/users/userService';

class UserController {

  async register(
    req: Request,
    res: Response
  ) {
    const { fullName, username, email, password, confirmPassword } = req.body;
    console.log({ fullName, username, email, password, confirmPassword });
    const expirationTime = 8.64e+7;
    const expirationDate = new Date(Date.now() + expirationTime);

    const { token } = await userService.register({ fullName, username, email, password, confirmPassword });

    res.cookie('jwt-token', `Bearer ${token}`, { expires: expirationDate, httpOnly: true });
    res.redirect('/home');
  }

  async login(req: Request, res: Response) {
    const { email, password } = req.body;
    const { token } = await userService.login({ email, password });

    res.cookie('jwt-token', `Bearer ${token}`);
    res.redirect('/home');
  }

}

export default new UserController();
