import {Request,Response, NextFunction} from 'express';
import jwt from 'jsonwebtoken'
import { authConfig } from '../config/auth';


class AuthAuthentication{

    async authToken(request: Request, response: Response, next: NextFunction ) {
        const authHeader = request.headers.authorization;
        if(authHeader) {
            const token = authHeader.split(' ')[1];
            if(token == null) return response.sendStatus(401);

            jwt.verify(token, authConfig.accessTokenSecret, (err, user) => {
                if (err) return response.sendStatus(403);
                // request.user = user;
                next();
            });   
        }else{
            return response.sendStatus(401);
        }

        
    }
}

export { AuthAuthentication };