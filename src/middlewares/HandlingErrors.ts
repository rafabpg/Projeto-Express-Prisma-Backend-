import { NextFunction, Request, Response } from "express";

async function handlingErrors(error:any,request:Request,response:Response,next:NextFunction){
    const statusCode = error.statusCode ?? 500;
    const message = error.statusCode ? error.message : 'Internal server error.';
    return response.status(statusCode).json({ message: message });
}
export { handlingErrors}