import { Request, Response } from 'express';
import  UserService  from '../../services/users/user.service';
import userSchema from '../../schema/users/user.schema';
import { UserType } from '../../types/users/user.type';
import userRepository from '../../repository/users/userRepository';
import userService from '../../services/users/user.service';

class UserController{



  //função de Registrar usuario
  async register(req: Request, res: Response){

    try{ 

      //chamando Service
    const registerUser = await UserService.register(req.body);

    if(!registerUser){//validação de dados basica
      res.status(400);
      throw new Error('Error User Data');
    }

    //resposta para o usuario
    res.status(201);
    return res.json(registerUser);


  }catch(Err){
    console.error(Err);
  }
  }


  //Update User by Email 
  async updateData(req:Request, res: Response){

    try{
    //capturando dados da request
    const {email} = req.query as {email:string}
    const newData = req.body

    //chamando reposiory
    const user = await userService.UpdateDataByEmail(email , newData);

    //respota para o cliente
    res.status(201);
    return res.json(user);

   //capturando erro 
  }catch(Err){
    console.error(Err);
  }

  }

  

}

export default new UserController();