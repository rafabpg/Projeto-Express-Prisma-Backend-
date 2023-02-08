import { UserDTOS } from '../dtos/UserDTOS';
import { User } from '@prisma/client';

interface IUserRepository{
    create(createUser:UserDTOS):Promise<void>;
    listUser():Promise<User[] | null>;
    findByID(id:string):Promise<User | null>;
    update(user:User):Promise<User>;
    delete(id:string):Promise<void>;
    findByUsername(username:string):Promise<User | null>;
    findByEmail(email:string):Promise<Boolean>;
}
export { IUserRepository };
