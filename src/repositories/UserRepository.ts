import { Post, User  } from "@prisma/client";
import { UserDTOS } from "../dtos/UserDTOS";
import { IUserRepository } from "./IUserRepository";
import { prisma } from '../database';
import { PostDTOS } from "../dtos/PostDTOS";



class UserRepository implements IUserRepository {

    async create(createUser: UserDTOS): Promise<void> {
        await prisma.user.create({
            data:createUser
        })
    }

    async listUser(): Promise<User[] | null> {
        const allUsers = await prisma.user.findMany();
        return allUsers;
    }

    async findByID(id: string): Promise<User | null> {
        const specificUser = await prisma.user.findFirst({
            where:{
                id:Number(id),
                AND:{
                    role:'USER'
                }
            },
        })
        return specificUser;
    }

    async update({id,name,username,email,password}: any): Promise<User> {
        const updateUser = await prisma.user.update({
            where:{
                id:Number(id),
            },
            data:{
                name:name,
                username:username,
                email:email,
                password:password
            }
        })
        return updateUser;
    }

    async delete(id: string): Promise<void> {
        await prisma.user.delete({
            where: {
                id:Number(id),
            },
        });
    }

    async findByUsername(username: string): Promise<User | null> {
        const user = await prisma.user.findFirst({
            where:{
                username:username,
            }
        });
        return user;
    }

    async findByEmail(email: string): Promise<Boolean> {
        let checkEmail = await prisma.user.findFirst({
            where:{
                email:email,
            }
        });
        if(checkEmail == null) return false;
        return true;
    }
    async createPost(id:string,post:PostDTOS):Promise<void>{
        await prisma.user.update({
            where:{
                id:Number(id)
            },
            data:{
                posts:{
                    create:{
                        title:post.title,
                        description:post.description
                    }
                }
            }
        })
    } 
    async getPosts(id:string):Promise<any>{
        const allPosts = await prisma.user.findMany({
            where:{
                id:Number(id)
            },
            select:{
                posts:true
            }
        })
        return allPosts;
    } 
    async deletePost(id:string):Promise<void>{
        await prisma.post.delete({
            where:{
                id:Number(id)
            }
        })
    } 

    async publishPost(id:string):Promise<void>{
        await prisma.post.update({
            where:{
                id:Number(id),
            },
            data:{
                published:true
            }
        });
    } 

    async findPostByID(id:string):Promise<any>{
        let checkPost = await prisma.post.findFirst({
            where:{
                id:Number(id),
            }
        });
        return checkPost;
    } 

    async updatePost(id:string,post:PostDTOS):Promise<Post>{
        const updatedPost  = await prisma.post.update({
            where:{
                id:Number(id)
            },
            data:{
                title:post.title,
                description:post.description
            }
        })
        return updatedPost;
    } 
    // async createToken(user:User,acessToken:string,expiredAt:Date):Promise<void>{
    //     await prisma.token.create({
    //         data:{
    //             userId:user.id,
    //             acessToken:acessToken,
    //             expiredAt:expiredAt
    //         }
    //     })
        // ({
        //     data:{
        //         
        //         
        //     }
        // });
        
    // }
    //pegar todos os posts  

}

export { UserRepository };