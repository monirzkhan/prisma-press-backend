import {  Router } from "express";
import { userController } from "./user.controller";


const router = Router();

router.post('/register', userController.regiterUser);
router.get('/me',userController.getMyProfile)

export const userRoutes = router;