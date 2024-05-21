import userRepository from '../../repository/users/userRepository';
import { UserType } from '../../types/users/user.type';

class UserService {


  //cadastrar user
  async register(user: UserType){
    const newUser = await userRepository.createUser(user);
    return newUser;
  }


  //Modificar dados do usuario
  async updateDataUser(id:string, user:UserType){
    const updateUser = await userRepository.updateUser(id, user); 
    return updateUser;
  }


  //modificar dados do usuario utilizando o email para encontra-lo
  async UpdateDataByEmail(email: string, user:UserType){
    const oldUser = await userRepository.findOneAndUpdateUser(email, user);
    return oldUser;
  }

}

export default new UserService();