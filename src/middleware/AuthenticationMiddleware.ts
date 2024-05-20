import { NextFunction, Response } from 'express';
import jwt from 'jsonwebtoken';
import IJwtPayload from '../types/AuthMiddleware/IJWTPayload';
import serverConfig from '../config/serverConfig';
import AuthenticatedRequest from '../types/AuthMiddleware/AuthenticatedRequest';

class AuthenticationMiddleware{

  static AuthenticateToken (
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
  ) {
    const authHeader = req.cookies['jwt-token'] || req.headers.authorization;

    if (AuthenticationMiddleware.authHeaderIsNotValid(authHeader)) {
      res.redirect('/login');
    }

    const token = authHeader!.split(' ')[1];

    try {
      const { userId } = jwt.verify(token, serverConfig.JWT_SECRETE_KEY!) as IJwtPayload;
      req.user = { userId };
      next();
    } catch (error) {
      res.redirect('/login');
    }

  }

  static authHeaderIsNotValid(authHeader: string | undefined): boolean {
    return !authHeader || !authHeader.startsWith('Bearer ');
  }

}

export default AuthenticationMiddleware;