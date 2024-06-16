import { Request, Response } from 'express';
import path from 'node:path';
import userService from '../../services/users/userService';
import AuthenticatedRequest from '../../types/AuthMiddleware/AuthenticatedRequest';

class UserController {

  async register(
    req: Request,
    res: Response
  ) {
    const { fullName, username, email, password, confirmPassword, cpf } = req.body;
    const expirationTime = 8.64e+7;
    const expirationDate = new Date(Date.now() + expirationTime);

    const { token } = await userService.register({ fullName, username, email, cpf, password, confirmPassword });

    res.cookie('jwt-token', `Bearer ${token}`, { expires: expirationDate, httpOnly: true });
    res.redirect('/home');
  }

  async login(req: Request, res: Response) {
    const { email, password } = req.body;
    const { token } = await userService.login({ email, password });

    res.cookie('jwt-token', `Bearer ${token}`);
    res.redirect('/home');
  }

  async profile(
    req: AuthenticatedRequest,
    res: Response
  ) {
    const page = req.query || 'personal-info';
    res.render(path.join(__dirname, '../../../views/user/user-info.ejs'), page);
  }

  async updateProfile(
    req: AuthenticatedRequest,
    res: Response
  ) {
    const { userId } = req.user!;
    const { ...data } = req.query;
    await userService.update(userId, data);
    if (data.page === 'delete-account') {
      res.clearCookie('jwt-token')
      res.redirect('/login')
    }
    res.redirect('/home');
  }

  async populate(
    req: Request,
    res: Response
  ) {
    await userService.populate();
    res.json({ success: true });
  }
}

export default new UserController();
