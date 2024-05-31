import jwt from 'jsonwebtoken';
import userRepository from '../../repository/users/userRepository';
import registerUserPayload from '../../types/users/registerUserPayload';
import loginUserPayload from '../../types/users/loginUserPayload';
import serverConfig from '../../config/serverConfig';
import { UserDocument } from '../../schema/users/user.schema';

class UserService {

  async register(
    userPayload: registerUserPayload
  ): Promise<{
    token: string
  }> {
    if (userPayload.password !== userPayload.confirmPassword) {
      throw new Error('Email ou senha inválidos');
    }

    if (!userPayload.password || !userPayload.confirmPassword) {
      throw new Error('Email ou senha inválidos');
    }

    const user = await userRepository.createUser(userPayload);

    const token = jwt.sign({ userId: user.id }, serverConfig.JWT_SECRETE_KEY!);

    return { token };
  }

  async login(
    userPayload: loginUserPayload
  ): Promise<{
    token: string
  }> {
    let user: UserDocument | null;
    try {
      user = await userRepository.login(userPayload);
    } catch (err) {
      throw new Error('internal server error');
    }

    if (!user) {
      throw new Error('user not found');
    }

    if (userPayload.password !== user.password) {
      throw new Error('Senha incorreta');
    }

    const token = jwt.sign({ userId: user.id }, serverConfig.JWT_SECRETE_KEY!);
    return { token };
  }

}

export default new UserService();