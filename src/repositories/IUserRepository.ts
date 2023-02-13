import { PostDTOS } from '../dtos/PostDTOS';
import { UserDTOS } from '../dtos/UserDTOS';
import { Post, User } from '@prisma/client';

interface IUserRepository{
    create(createUser:UserDTOS):Promise<void>;
    listUser():Promise<User[] | null>;
    findByID(id:string):Promise<User | null>;
    update(user:any):Promise<User>;
    delete(id:string):Promise<void>;
    findByUsername(username:string):Promise<User | null>;
    findByEmail(email:string):Promise<Boolean>;
    createPost(id:string,post:PostDTOS):Promise<void>
    getPosts(id:string):Promise<any>;
    findPostByID(id:string):Promise<any>;
    publishPost(id:string):Promise<void>;
    deletePost(id:string):Promise<void>;
    updatePost(id:string,post:PostDTOS):Promise<Post>;
    // createToken(user:User,acessToken:string,expiredAt:Date):Promise<void>;
}
export { IUserRepository };
