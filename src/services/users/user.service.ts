import userModel from "../../schema/users/user.schema";
import { UserType } from "../../types/users/user.type";


class UserService {

    async register(user: UserType){
        const newUser = await userModel.create(user);
        return newUser;
    }


}

export default new UserService() 