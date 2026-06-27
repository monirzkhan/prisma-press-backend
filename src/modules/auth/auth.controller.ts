import { NextFunction, Request, Response } from "express";
import { authservice } from "./auth.service";
import { sendResponse } from "../../utilities/sendResponse";
import httpStatus from "http-status";
import { catchAsync } from "../../utilities/catchAsync";
import { userService } from "../user/user.service";


const loginUser = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const payload = req.body;

    const { accessToken, refreshToken } = await authservice.loginUserFromDB(payload);

    res.cookie('accessToken', accessToken, {
        httpOnly: true,
        secure: false,
        sameSite: 'none',
        maxAge: 1000 * 60 * 60 * 24   //24 hrs or 1 day
    })

    res.cookie('refreshToken', refreshToken, {
        httpOnly: true,
        secure: false,
        sameSite: 'none',
        maxAge: 1000 * 60 * 60 * 24 * 7 //7 days
    })

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: 'User logged in successfully',
        data: {
            accessToken, refreshToken
        }
    })

})

const refreshToken = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const refreshToken = req.cookies.refreshToken;

    console.log(refreshToken);

    const { accessToken } = await authservice.refreshToken(refreshToken);

    res.cookie('accessToken', accessToken, {
        httpOnly: true,
        secure: false,
        sameSite: 'none',
        maxAge: 1000 * 60 * 60 * 24   //24 hrs or 1 day
    })

    sendResponse(res, {
        statusCode: httpStatus.OK,
        message: ' Token Ref reshed Successfully',
        success: true,
        data: { accessToken }
    })

})

export const authController = {
    loginUser,
    refreshToken
}