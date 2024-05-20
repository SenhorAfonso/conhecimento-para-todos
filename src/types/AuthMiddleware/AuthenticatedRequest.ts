import { Request } from 'express';

interface AuthenticatedRequest extends Request {
  user?: {
    userId: string
  };
};

export default AuthenticatedRequest;