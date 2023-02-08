import { User } from "@prisma/client";
import { UserDTOS } from "../dtos/UserDTOS";
import { IUserRepository } from "./IUserRepository";
import { prisma } from '../database';



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
    
}

export { UserRepository };