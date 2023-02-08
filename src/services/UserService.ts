import { UserRepository } from '../repositories/UserRepository';


interface CreateUserRequest{
    name:string,
    email:string,
    username:string,
    password:string
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

    async create({name,email,username,password}:CreateUserRequest){
        let checkUsername = await this.userRepository.findByUsername(username);
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

}
export { UserService }


