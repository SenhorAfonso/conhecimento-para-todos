import registerUserPayload from '../../types/users/registerUserPayload';
import userModel, { UserDocument } from '../../schema/users/user.schema';
import loginUserPayload from '../../types/users/loginUserPayload';

class UserRepository {
  async createUser(user: registerUserPayload): Promise<UserDocument> {
    const previusRegister = await userModel.findOne({ email: user.email });

    if (previusRegister) {
      throw new Error('Email já cadastrado');
    }

    const result = await userModel.create(user);
    return result;
  }

  async login(user: loginUserPayload): Promise<UserDocument | null> {
    const result = await userModel.findOne({ email: user.email });
    return result;
  }

  async getUserById(userId: string): Promise<UserDocument | null> {
    const result = await userModel.findById({ _id: userId }).exec();
    return result;
  }

  async updateUser(userId: string, newData: Partial<UserDocument>): Promise<UserDocument | null> {
    const result = await userModel.findByIdAndUpdate(userId, newData, { new: true }).exec();
    return result;
  }

  async deleteUser(userId: string): Promise<UserDocument | null> {
    const result = await userModel.findByIdAndDelete(userId).exec();
    return result;
  }
}

export default new UserRepository();