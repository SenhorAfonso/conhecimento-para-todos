// controller/users/userController.ts

import { Request, Response } from 'express';
import userService from '../../services/users/userService';

class UserController {


  async register(
    req: Request,
    res: Response
  ) {
    const { fullname, username, email, password, confirmPassword } = req.body;
    const expirationTime = 8.64e+7;
    const expirationDate = new Date(Date.now() + expirationTime);

      const { token } = await userService.register({ fullname, username, email, password, confirmPassword });

      res.cookie('jwt-token', `Bearer ${token}`, { expires: expirationDate, httpOnly: true });
      res.redirect('/home');
    } catch (error) {
      console.error('Error registering user:', error);
      res.status(500).send('Error registering user');
    }
  }

  async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;
      const { token } = await userService.login({ email, password });

      res.cookie('jwt-token', `Bearer ${token}`);
      res.redirect('/home');
    } catch (error) {
      console.error('Error logging in user:', error);
      res.status(500).send('Error logging in user');
    }
  }

}

export default new UserController();
