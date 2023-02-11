import { authConfig } from "../config/auth";
import { UserRepository } from "../repositories/UserRepository";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

class AuthService{
    constructor(private userRepository: UserRepository){}

    async login(username:string,password:string){
        const user = await this.userRepository.findByUsername(username);;
        if(user == null) throw Error('Usuario incorreto');
        const passwordValid = bcrypt.compareSync(password, user.password);
        if(!passwordValid) throw Error('Senha incorreta');
        const acessToken  = jwt.sign({username:user.username,role:user.role},authConfig.accessTokenSecret,{
            subject:String(user.id),
            expiresIn:"7d"
        })
        const refreshToken = jwt.sign({ username: user.username, role: user.role }, authConfig.refreshTokenSecret);
        const expiredAt = new Date();
        expiredAt.setDate(expiredAt.getDate() + 7);
        await this.userRepository.createToken(user,refreshToken,expiredAt);
        // const {id} = user;
        return acessToken;
    }

    // async refresh(username:string,password:string){
    //     const user = await this.userRepository.findByUsername(username);;
    //     if(user == null) throw Error('Usuario incorreto');
    //     const passwordValid = bcrypt.compareSync(password, user.password);
    //     if(!passwordValid) throw Error('Senha incorreta');
    //     const acessToken  = jwt.sign({username:user.username,role:user.role},authConfig.accessTokenSecret)
    //     // const {id} = user;
    //     return acessToken;
    // }

    // async logout(username:string,password:string){
    //     const user = await this.userRepository.findByUsername(username);;
    //     if(user == null) throw Error('Usuario incorreto');
    //     const passwordValid = bcrypt.compareSync(password, user.password);
    //     if(!passwordValid) throw Error('Senha incorreta');
    //     const acessToken  = jwt.sign({username:user.username,role:user.role},authConfig.accessTokenSecret)
    //     // const {id} = user;
    //     return acessToken;
    // }

}

export { AuthService }