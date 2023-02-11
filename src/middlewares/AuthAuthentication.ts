import {Request,Response, NextFunction} from 'express';
import jwt from 'jsonwebtoken'
import { authConfig } from '../config/auth';

type TokenPayload = {
    id:string;
    iat:number;
    exp:number;
}


class AuthAuthentication{

    async authToken(request: Request, response: Response, next: NextFunction ) {
        const authHeader = request.headers.authorization;
        // const authHeader = request.headers['authorization'];
        if(authHeader) {
            const token = authHeader.split(' ')[1];
            if(token == null) return response.sendStatus(401);

            const decode = jwt.verify(token, authConfig.accessTokenSecret)
            
            const {id}  = decode as TokenPayload;
                // , (err, user) => {
                // if (err) return response.sendStatus(403);
                // request.user = user;
                // });   
            request.userId = id;
            next();
        }else{
            return response.sendStatus(401);
        }

        
    }
}

export { AuthAuthentication };