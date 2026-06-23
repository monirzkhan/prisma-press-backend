import { Request, Response } from "express";
import httpStatus from "http-status";

import { userService } from "./user.service";

const regiterUser = async (req: Request, res: Response) => {


    // console.log(payload);
    try {
        const payload = req.body;
        const user = await userService.registerUserIntoDB(payload)

        res.status(httpStatus.CREATED).json({
            message: 'User created successfully',
            success: true,
            statusCode: httpStatus.CREATED,
            data: { user }
        });
    } catch (error: any) {
        console.log(error);
        res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
            message: error.message || 'Something went wrong',
            success: false,
            statusCode: httpStatus.INTERNAL_SERVER_ERROR
        });
    }

}

export const userController = {
    regiterUser
}