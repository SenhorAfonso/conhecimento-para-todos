/* eslint-disable no-return-await */
import User from '../../schema/users/user.schema';
import registerUserPayload from '../../types/users/registerUserPayload';
import loginUserPayload from '../../types/users/loginUserPayload';
import sequelize from '../../infra/database/sequelize';


class UserRepository {
  async createUser(user: any): Promise<User> {
    return await User.create(user);
  }

  async login(user: loginUserPayload): Promise<User | null> {
    return await User.findOne({ where: { email: user.email } });
  }

  async getUserById(userId: string): Promise<User | null> {
    return await User.findByPk(userId);
  }

  async updateUser(userId: string, newData: Partial<User>): Promise<[number, User[]]> {
    const [affectedCount, updatedUsers] = await User.update(newData, { where: { id: userId }, returning: true });
    return [affectedCount, updatedUsers];
  }

  async deleteUser(userId: string): Promise<number> {
    return await User.destroy({ where: { id: userId } });
  }

  async deleteAll() {
    await sequelize.query('TRUNCATE TABLE users RESTART IDENTITY CASCADE;');
  }
}

export default new UserRepository();
