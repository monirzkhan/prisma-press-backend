import { NextFunction, Request, Response, Router } from "express";
import { userController } from "./user.controller";
import { jwtUtils } from "../../utilities/jwt";
import config from "../../config";
import { Role } from "../../../generated/prisma/enums";
import httpStatus from 'http-status'
import { JwtPayload } from "jsonwebtoken";


const router = Router();

router.post('/register', userController.registerUser);
router.get('/me',
    (req: Request, res: Response, next: NextFunction) => {
        // console.log(req.cookies)
        const { accessToken } = req.cookies;

        const verifiedToken = jwtUtils.verifyToken(accessToken, config.jwt_access_secret);
        console.log(verifiedToken);

        if (!verifiedToken) {
            throw new Error('Invalid Token')
        }

        const { email, name, id, role } = verifiedToken as JwtPayload;



        const requiredRole = [Role.ADMIN, Role.USER, Role.AUTHOR];

        if (!requiredRole.includes(role)) {
            return res.status(403).json({
                success: false,
                statusCode: httpStatus.FORBIDDEN,
                message: "Forbidden. You don't have permission to access this resource."

            })
        }
        next()

    },

    userController.getMyProfile)

export const userRoutes = router;