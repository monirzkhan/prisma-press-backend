import { Request, Response } from "express";
import httpStatus from "http-status";

import { userService } from "./user.service";
import { sendResponse } from "../../utilities/sendResponse";

const regiterUser = async (req: Request, res: Response) => {


    // console.log(payload);
    try {
        const payload = req.body;
        const user = await userService.registerUserIntoDB(payload)

        // res.status(httpStatus.CREATED).json({
        //     message: 'User created successfully',
        //     success: true,
        //     statusCode: httpStatus.CREATED,
        //     data: { user }
        // });

        sendResponse(res, {
            message: 'User created successfully',
            success: true,
            statusCode: httpStatus.CREATED,
            data: { user }
        })
    } catch (error: any) {
        console.log(error);
        sendResponse(res, {
            message: error.message || 'Something went wrong',
            success: false,
            statusCode: httpStatus.INTERNAL_SERVER_ERROR,
            data: {}
        });
    }

}


const getMyProfile = async (req: Request, res: Response) => {
    const payload = req.body
}

export const userController = {
    regiterUser,
    getMyProfile
}