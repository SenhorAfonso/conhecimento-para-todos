import { Request, Response } from "express";
import  UserService  from "../../services/users/user.service";

class UserController{

    async register(req: Request, res: Response){
        const registerUser = await UserService.register(req.body);

        if(!registerUser){
            res.status(400)
            throw new Error("Error User Data");
        }

        res.status(201);
        return res.json(registerUser)
    }


}

export default new UserController()