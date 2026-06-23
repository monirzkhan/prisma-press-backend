import { NextFunction, Request, Response } from "express";
import { authservice } from "./auth.service";
import { sendResponse } from "../../utilities/sendResponse";
import httpStatus from "http-status";


const loginUser = async (req: Request, res: Response, next: NextFunction) => {
    const payload = req.body;

    const loginResult = await authservice.loginUserFromDB(payload);

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: 'User logged in successfully',
        data: loginResult
    })

}

export const authController = {
    loginUser
}