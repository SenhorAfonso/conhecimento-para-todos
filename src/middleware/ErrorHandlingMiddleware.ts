import { NextFunction, Request, Response } from 'express';

class ErrorHandlingMiddleware {

  static errorHandler(
    error: Error,
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const success: boolean = false;
    if (error) {
      const { name, message } = error;
      res.status(500).json({ success, error: { name, message } });
    }
  }

}

export default ErrorHandlingMiddleware;