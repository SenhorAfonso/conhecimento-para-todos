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

  async populate() {
    const users = [
      { username: 'joaosilva', fullName: 'João Silva', cpf: '123.456.789-00', email: 'joao.silva@example.com', password: 'senha123', profilePic: 'https://example.com/profiles/joaosilva.jpg', createdAt: '2024-01-10T14:00:00Z', updatedAt: '2024-01-10T14:00:00Z' },
      { username: 'mariasantos', fullName: 'Maria Santos', cpf: '987.654.321-00', email: 'maria.santos@example.com', password: 'senha123', profilePic: 'https://example.com/profiles/mariasantos.jpg', createdAt: '2024-01-11T14:00:00Z', updatedAt: '2024-01-11T14:00:00Z' },
      { username: 'pedroalmeida', fullName: 'Pedro Almeida', cpf: '123.123.123-12', email: 'pedro.almeida@example.com', password: 'senha123', profilePic: 'https://example.com/profiles/pedroalmeida.jpg', createdAt: '2024-01-12T14:00:00Z', updatedAt: '2024-01-12T14:00:00Z' },
      { username: 'julianasilva', fullName: 'Juliana Silva', cpf: '321.321.321-32', email: 'juliana.silva@example.com', password: 'senha123', profilePic: 'https://example.com/profiles/julianasilva.jpg', createdAt: '2024-01-13T14:00:00Z', updatedAt: '2024-01-13T14:00:00Z' },
      { username: 'carlosoliveira', fullName: 'Carlos Oliveira', cpf: '456.456.456-45', email: 'carlos.oliveira@example.com', password: 'senha123', profilePic: 'https://example.com/profiles/carlosoliveira.jpg', createdAt: '2024-01-14T14:00:00Z', updatedAt: '2024-01-14T14:00:00Z' },
      { username: 'anapaula', fullName: 'Ana Paula', cpf: '789.789.789-78', email: 'ana.paula@example.com', password: 'senha123', profilePic: 'https://example.com/profiles/anapaula.jpg', createdAt: '2024-01-15T14:00:00Z', updatedAt: '2024-01-15T14:00:00Z' },
      { username: 'luizfernando', fullName: 'Luiz Fernando', cpf: '852.852.852-85', email: 'luiz.fernando@example.com', password: 'senha123', profilePic: 'https://example.com/profiles/luizfernando.jpg', createdAt: '2024-01-16T14:00:00Z', updatedAt: '2024-01-16T14:00:00Z' },
      { username: 'fernandogoncalves', fullName: 'Fernando Gonçalves', cpf: '963.963.963-96', email: 'fernando.goncalves@example.com', password: 'senha123', profilePic: 'https://example.com/profiles/fernandogoncalves.jpg', createdAt: '2024-01-17T14:00:00Z', updatedAt: '2024-01-17T14:00:00Z' },
      { username: 'clarasilva', fullName: 'Clara Silva', cpf: '741.741.741-74', email: 'clara.silva@example.com', password: 'senha123', profilePic: 'https://example.com/profiles/clarasilva.jpg', createdAt: '2024-01-18T14:00:00Z', updatedAt: '2024-01-18T14:00:00Z' },
      { username: 'gabrielpinto', fullName: 'Gabriel Pinto', cpf: '159.159.159-15', email: 'gabriel.pinto@example.com', password: 'senha123', profilePic: 'https://example.com/profiles/gabrielpinto.jpg', createdAt: '2024-01-19T14:00:00Z', updatedAt: '2024-01-19T14:00:00Z' },
      { username: 'robertorocha', fullName: 'Roberto Rocha', cpf: '369.258.147-00', email: 'roberto.rocha@example.com', password: 'senha123', profilePic: 'https://example.com/profiles/robertorocha.jpg', createdAt: '2024-01-20T14:00:00Z', updatedAt: '2024-01-20T14:00:00Z' },
      { username: 'patriciaaraujo', fullName: 'Patricia Araújo', cpf: '741.852.963-00', email: 'patricia.araujo@example.com', password: 'senha123', profilePic: 'https://example.com/profiles/patriciaaraujo.jpg', createdAt: '2024-01-21T14:00:00Z', updatedAt: '2024-01-21T14:00:00Z' }
    ];

    await userRepository.deleteAll();
    Promise.all(users.map(async (user) => {
      await userRepository.createUser(user);
      return true;
    }));

    return true;

  }
}

export default new UserService();