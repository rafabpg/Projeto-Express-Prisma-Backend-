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

//POSTS


usersRoutes.post('/posts', (request, response) => {
    return userController.createPost(request, response);
})

usersRoutes.get('/:id/posts', (request, response) => {
    return userController.getPosts(request, response);
}) 

usersRoutes.delete('/posts/:id', (request, response) => {
    return userController.deletePost(request, response);
})

usersRoutes.patch('/posts/:id/published', (request, response) => {
    return userController.publishPost(request, response);
})

usersRoutes.put('/posts/:id', (request, response) => {
    return userController.updatePost(request, response);
})




export {usersRoutes};