import { UserType } from '../../types/users/user.type';
import { UserDocument } from '../../schema/users/user.schema';
import User from '../../schema/users/user.schema';

class UserRepository {
    async createUser(user: UserType): Promise<UserDocument> {
        return await User.create(user);
    }

    async getUserById(userId: string): Promise<UserDocument | null> {
        return await User.findById(userId).exec();
    }

    async updateUser(userId: string, newData: Partial<UserModel>): Promise<UserDocument | null> {
        return await User.findByIdAndUpdate(userId, newData, { new: true }).exec();
    }

    async deleteUser(userId: string): Promise<UserDocument | null> {
        return await User.findByIdAndDelete(userId).exec();
    }

    // Outras funções de consulta conforme necessário
}

export default new UserRepository();