import { NextFunction, Request, Response, Router } from "express";
import { userController } from "./user.controller";
import { jwtUtils } from "../../utilities/jwt";
import config from "../../config";
import { Role } from "../../../generated/prisma/enums";
import httpStatus from 'http-status'
import { JwtPayload } from "jsonwebtoken";
import { auth } from "../../middleware/auth";


const router = Router();



router.post('/register', userController.registerUser);
router.get('/me',auth("ADMIN","USER"),userController.getMyProfile)
router.put('/my-profile', auth('ADMIN', "AUTHOR", "USER"), userController.updateMyProfile)

export const userRoutes = router;