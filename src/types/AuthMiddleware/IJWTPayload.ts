import { JwtPayload } from 'jsonwebtoken';

interface IJwtPayload extends JwtPayload {
  userId: string;
}

export default IJwtPayload;