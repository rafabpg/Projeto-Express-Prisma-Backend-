import { Router } from "express";
 import { UserController } from "../controller/UserController";
import { UserService } from "../services/UserService";
import { UserRepository } from "../repositories/UserRepository";
import { AuthAuthentication } from "../middlewares/AuthAuthentication";



const usersRoutes = Router();
const userRepository = new UserRepository();
const userService = new UserService(userRepository);
const userController = new UserController(userService);
const auth = new AuthAuthentication();

usersRoutes.post('/',(request, response) => {
   return userController.create(request, response);
})

usersRoutes.get('/', auth.authToken, (request, response) => {
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

//POSTS


usersRoutes.post('/posts', auth.authToken, (request, response) => {
    return userController.createPost(request, response);
})

usersRoutes.get('/:id/posts', (request, response) => {
    return userController.getPosts(request, response);
}) 

usersRoutes.delete('/posts/:id', auth.authToken, (request, response) => {
    return userController.deletePost(request, response);
})

usersRoutes.patch('/posts/:id/published', auth.authToken, (request, response) => {
    return userController.publishPost(request, response);
})

usersRoutes.put('/posts/:id', auth.authToken, (request, response) => {
    return userController.updatePost(request, response);
})




export {usersRoutes};