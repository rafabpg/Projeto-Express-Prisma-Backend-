import { AuthService } from "../services/AuthService";
import {Request,Response} from 'express';

class AuthController{
    constructor(private authService : AuthService){}

    async login(request:Request,response:Response){
        const { username, password } = request.body;
        try {
            const acessToken = await this.authService.login(username, password);
            return response.status(201).json({acessToken:acessToken});
        } catch (error:any) {
            return response.status(400).json({error: error.message});
        }
    }

}
export { AuthController }