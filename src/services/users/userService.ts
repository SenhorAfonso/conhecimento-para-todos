import jwt from 'jsonwebtoken';
import userRepository from '../../repository/users/userRepository';
import registerUserPayload from '../../types/users/registerUserPayload';
import loginUserPayload from '../../types/users/loginUserPayload';
import serverConfig from '../../config/serverConfig';
import UserDocument from '../../schema/users/user.schema';

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

  async update(
    userId: string,
    data: any
  ) {
    const payload = this.validateUpdateProfileData(data);
    const { page } = payload;

    if (page === 'personal-info') {
      await userRepository.updateUser(userId, payload);
      return;
    }

    if (page === 'user-security') {
      const user = await userRepository.getUserById(userId);

      if (user?.password !== payload.lastPass) {
        throw new Error('incorrect password');
      }

      if (payload.newPass !== payload.confirmPass || payload.newPass === '') {
        throw new Error('passwords dont match');
      }

      await userRepository.updateUser(userId, { password: payload.newPass });
    }

    if (page === 'delete-account') {
      const user = await userRepository.getUserById(userId);
      if (user?.fullName !== payload.fullName) {
        throw new Error('The name is incorrect');
      }

      if (payload.pass !== payload.confirmPass || payload.pass === '') {
        throw new Error('The passwords are invalid');
      }

      await userRepository.deleteUser(userId);
    }
  }

  private validateUpdateProfileData(data: any) {
    switch (data.page) {
      case 'personal-info':
        if (!data.name || !data.surname || !data.cpf) {
          throw new Error('All fields are required!');
        } else {
          return { page: 'personal-info', fullName: `${data.name} ${data.surname}`, cpf: data.cpf };
        }
      case 'user-security':
        if (!data.lastPass || !data.newPass || !data.confirmPass) {
          throw new Error('All fields are required!');
        }
        return data;
      case 'delete-account':
        if (!data.fullName || !data.pass || !data.confirmPass) {
          throw new Error('All fields are required!');
        }
        return data;
      default:
        throw new Error('unknow page');
    }

  }
}

export default new UserService();