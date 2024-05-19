import jwt from 'jsonwebtoken';
import userRepository from '../../repository/users/userRepository';
import registerUserPayload from '../../types/users/registerUserPayload';
import loginUserPayload from '../../types/users/loginUserPayload';
import serverConfig from '../../config/serverConfig';

class UserService {

  async register(userPayload: registerUserPayload){
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

  async login(userPayload: loginUserPayload) {
    const user = await userRepository.login(userPayload);

    const token = jwt.sign({ userId: user.id }, serverConfig.JWT_SECRETE_KEY!);

    return { token };
  }

}

export default new UserService();