import { UserType } from '../../types/users/user.type';
import User, { UserDocument } from '../../schema/users/user.schema';

class UserRepository {
  async createUser(user: UserType): Promise<UserDocument> {
    const result = await User.create(user);
    return result;
  }

  async getUserById(userId: string): Promise<UserDocument | null> {
    const result = await User.findById(userId).exec();
    return result;
  }

  async updateUser(userId: string, newData: Partial<UserModel>): Promise<UserDocument | null> {
    const result = await User.findByIdAndUpdate(userId, newData, { new: true }).exec();
    return result;
  }

  async deleteUser(userId: string): Promise<UserDocument | null> {
    const result = await User.findByIdAndDelete(userId).exec();
    return result;
  }

  // Outras funções de consulta conforme necessário
}

export default new UserRepository();