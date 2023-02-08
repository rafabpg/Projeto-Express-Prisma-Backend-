import { Router } from "express";
 import { UserController } from "../controller/UserController";
import { UserService } from "../services/UserService";
import { UserRepository } from "../repositories/UserRepository";


const usersRoutes = Router();
const userRepository = new UserRepository();
const userService = new UserService(userRepository);
const userController = new UserController(userService);


usersRoutes.post('/',(request, response) => {
   return userController.create(request, response);
})

usersRoutes.get('/',(request, response) => {
    return userController.get(request, response);
})

usersRoutes.get('/:id', (request, response) => {
    return userController.findByID(request, response);
})

usersRoutes.put('/:id', (request, response) => {
    return userController.update(request, response);
})

usersRoutes.delete('/:id', (request, response) => {
    return userController.delete(request, response);
})




export {usersRoutes};