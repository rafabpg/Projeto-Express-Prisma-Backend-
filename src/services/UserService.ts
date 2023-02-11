import { UserRepository } from '../repositories/UserRepository';
import bcrypt from 'bcrypt';




interface CreateUserRequest{
    name:string,
    email:string,
    username:string,
    hashPassword:string
}

interface UpdateUserRequest{
    id:string,
    name?:string,
    username?:string,
    email?:string,
    password?:string
}

class UserService{
    constructor( private userRepository: UserRepository){}

    async create({name,email,username,hashPassword}:CreateUserRequest){
        let checkUsername = await this.userRepository.findByUsername(username);
        // const salt = await bcrypt.genSalt();
        const password = await bcrypt.hash(hashPassword,10)
        if(checkUsername){
            throw Error('Username ja em uso');
        } 
        else{
            let checkEmail = await this.userRepository.findByEmail(email);
            if(checkEmail){
                throw Error('Email ja em uso');
            } 
            this.userRepository.create({name,email,username,password})
        }
    }

    async get(){
        const allUser = await this.userRepository.listUser();
        return allUser;
    }

    async findByID(id:string){
        const userSpecificService = await this.userRepository.findByID(id);
        if(userSpecificService == null) throw Error('Usuario não encontrado');
        //checar se foi falso
        return userSpecificService;
    }

    async update({id,name,username,email,password}:UpdateUserRequest){
        const userSpecificService = await this.userRepository.findByID(id);
        if(userSpecificService == null) {throw Error('Usuario não encontrado');}
            if(email){
                let checkEmail = await this.userRepository.findByEmail(email);
                if(checkEmail){
                    throw Error('Esse email ja esta em uso');
                }
            }
            if(username){
                let checkUsername = await this.userRepository.findByUsername(username);
                if(checkUsername){
                    throw Error('Username ja em uso');
                }
            }
            const updateUser = await this.userRepository.update({id,name,username,email,password});
            return updateUser;     
    }

    async delete(id:string){
        //check if user exist
        const userSpecificService = await this.userRepository.findByID(id);
        if(userSpecificService == null) throw Error('Usuario não encontrado');
        this.userRepository.delete(id);
    }
    async createPost(id:string,title:string,description:string){
        if(id && title && description){
            this.userRepository.createPost(id,{title,description});
        }else{
            throw Error('Campos não preenchidos');
        }
    }

    async getPosts(id:string){
        if(id){
            const allUserPosts =  await this.userRepository.getPosts(id);
            return allUserPosts;
        }else{
            throw Error('Campos não preenchidos');
        }
    }

    async deletePost(id:string){
        const checkPost = await this.userRepository.findPostByID(id);
        if(checkPost == null){
            throw Error('Post não encontrado');
        }else{
            this.userRepository.deletePost(id);
        }
    }

    async publishPost(id:string){
        const checkPost = await this.userRepository.findPostByID(id);
        if(checkPost == null){
            throw Error('Post não encontrado');
        }else{
            this.userRepository.publishPost(id);
        }
    }
    
    async updatePost(id:string,title:string,description:string){
        const checkPost = await this.userRepository.findPostByID(id);
        if(checkPost == null){
            throw Error('Post não encontrado');
        }else{
           const updatedPost =  this.userRepository.updatePost(id,{title,description});
           return updatedPost;
        }
        
    }

}
export { UserService }


