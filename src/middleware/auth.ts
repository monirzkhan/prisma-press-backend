import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../utilities/catchAsync";
import { jwtUtils } from "../utilities/jwt";
import config from "../config";
import { Role } from "../../generated/prisma/enums";
import httpStatus from 'http-status'
import { JwtPayload } from "jsonwebtoken";
import { prisma } from "../lib/prisma";

declare global {
    namespace Express {
        interface Request {
            user?: {
                name: string,
                id: string,
                email: string,
                role: Role

            }

        }
    }
}

export const auth = (...requiredRole: Role[]) => {
    return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
        // console.log(req.cookies)
        // const { accessToken } = req.cookies;

        const tokenFromCookie = req.cookies?.accessToken;
        const authHeader = req.headers.authorization;
        const tokenFromHeader = authHeader?.startsWith('Bearer ')
            ? authHeader.split(' ')[1]
            : undefined;
        const token = tokenFromCookie || tokenFromHeader || authHeader;

        if (!token) {
            throw new Error('You are not logged in. Please log in to access this resource.')
        }

        const verifiedToken = jwtUtils.verifyToken(token, config.jwt_access_secret);
        const { email, name, id, role } = verifiedToken;



        // const requiredRole = [Role.ADMIN, Role.USER, Role.AUTHOR];

        if (requiredRole.length && !requiredRole.includes(role)) {
            return res.status(403).json({
                success: false,
                statusCode: httpStatus.FORBIDDEN,
                message: "Forbidden. You don't have permission to access this resource."

            })
        }
        
        const user= await prisma.user.findUnique({
            where:{
                id,
                email,
                name,
                role
            }
        })

        if(!user){
            throw new Error("User not found. Please log in again.");
        };

        if(user.activeStatus === "BLOCKED"){
            throw new Error("Your account has been blocked. Please contact support.");
        };

        req.user = {
            email,
            name,
            id,
            role
        };
        next()

    },)
}