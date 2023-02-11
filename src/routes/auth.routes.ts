import { Router } from "express";
import { UserRepository } from "../repositories/UserRepository";
import { AuthService } from "../services/AuthService";
import { AuthController } from "../controller/AuthController";




const userRepository = new UserRepository();
const authService = new AuthService(userRepository);
const authController = new AuthController(authService);



const authRoutes = Router();


authRoutes.post('/login',(request,response)=>{
    return authController.login(request,response)
})

authRoutes.post('/token',(request,response)=>{
    return authController.login(request,response)
})

authRoutes.post('/logout',(request,response)=>{
    return authController.login(request,response)
})

export {authRoutes}