import {Request,Response} from 'express';
import { UserService } from '../services/UserService';

class UserController{
    constructor(private userService : UserService){}

    async create(request:Request,response:Response){
        const {email,name,username,password} = request.body;
        // if(role !== 'ADMIN') return response.status(403).send({message:'Sem autorização para postar um post'});
        const hashPassword = password;
        await this.userService.create({email,name,username,hashPassword});
        return response.status(201).send({message:'Usuário criado com sucesso'});
        // try {
        // } catch (error:any) {
        //     return response.status(400).json({error: error.message});
        // }
    }

    async get(request:Request,response:Response){
        // const { role } = request.user
        
        // const  { userId }  = request;
        //userId
        const allUsers =  await this.userService.get();
        return response.status(200).json(allUsers);
        // try {
        // } catch (error:any) {
        //     return response.status(400).json({error: error.message});
        // }
    }
    
    async findByID(request:Request,response:Response){
        const {id} = request.params;
        const specificUser = await this.userService.findByID(id);
        return response.status(200).json(specificUser);
        // try {
        // } catch (error:any) {
        //     return response.status(404).json({error: error.message});
        // }
    }

    async update(request:Request,response:Response){
        const {id} = request.params;
        const {name,username,email,password} = request.body;
        const updateUserController = await this.userService.update({id,name,username,email,password});
        return response.status(200).json(updateUserController);
        // try {
        // } catch (error:any) {
        //     return response.status(400).json({error: error.message});
        // }
    }

    async delete(request:Request,response:Response){
        const {id} = request.params;
        await this.userService.delete(id);
        return response.status(200).send({message:'usuario deletado com sucesso'});
        // try {
        // } catch (error:any) {
        //     return response.status(400).json({error: error.message});
        // }
    }
    async createPost(request:Request,response:Response){
        const {id,title,description} = request.body;
        return response.status(200).send({message:'post criado com sucesso'});
        await this.userService.createPost(id,title,description);
        // try {
        // } catch(error:any)  {
        //     return response.status(400).json({error: error.message});
        // }
    }

    async getPosts(request:Request,response:Response){
        const {id} = request.params;
        const allUserPosts = await this.userService.getPosts(id);
        return response.status(200).json(allUserPosts);
        // try {
        // } catch(error:any)  {
        //     return response.status(400).json({error: error.message});
        // }
    }

    async deletePost(request:Request,response:Response){
        const {id} = request.params;
        await this.userService.deletePost(id);
        return response.status(200).send({message:'post deletado com sucesso'});
        // try {
        // } catch(error:any)  {
        //     return response.status(400).json({error: error.message});
        // }
    }

    async publishPost(request:Request,response:Response){
        const {id} = request.params;
        await this.userService.publishPost(id);
        return response.status(200).send({message:'post publicado com sucesso'});
        // try {
        // } catch(error:any)  {
        //     return response.status(400).json({error: error.message});
        // }
    }

    async updatePost(request:Request,response:Response){
        const {id} = request.params;
        const {title,description} = request.body;
        const updatedPost =  await this.userService.updatePost(id,title,description);
        return response.status(200).json(updatedPost);
        // try {
        // } catch(error:any)  {
        //     return response.status(400).json({error: error.message});
        // }
    }

}

export {UserController}
