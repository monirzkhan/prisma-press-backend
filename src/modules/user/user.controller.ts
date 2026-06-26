import { NextFunction, request, Request, RequestHandler, Response } from "express";
import httpStatus from "http-status";
import jwt from 'jsonwebtoken'

import { userService } from "./user.service";
import { sendResponse } from "../../utilities/sendResponse";
import { catchAsync } from "../../utilities/catchAsync";
import config from "../../config";
import { jwtUtils } from "../../utilities/jwt";



// const catchAsync = (fn: RequestHandler) => {
//     return async (req: Request, res: Response, next: NextFunction) => {
//         try {
//             fn(req, res, next)

//         } catch (error: any) {
//             console.log(error);
//             sendResponse(res, {
//                 message: error.message || 'Something went wrong',
//                 success: false,
//                 statusCode: httpStatus.INTERNAL_SERVER_ERROR,
//                 data: {}
//             });
//         }
//     }

// }

// const registerUser = async (req: Request, res: Response) => {


//     // console.log(payload);
//     try {
//         const payload = req.body;
//         const user = await userService.registerUserIntoDB(payload)

//         // res.status(httpStatus.CREATED).json({
//         //     message: 'User created successfully',
//         //     success: true,
//         //     statusCode: httpStatus.CREATED,
//         //     data: { user }
//         // });

//         sendResponse(res, {
//             message: 'User created successfully',
//             success: true,
//             statusCode: httpStatus.CREATED,
//             data: { user }
//         })
//     } catch (error: any) {
//         console.log(error);
//         sendResponse(res, {
//             message: error.message || 'Something went wrong',
//             success: false,
//             statusCode: httpStatus.INTERNAL_SERVER_ERROR,
//             data: {}
//         });
//     }

// }
const registerUser = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const payload = req.body;
    const user = await userService.registerUserIntoDB(payload)

    sendResponse(res, {
        message: 'User Created Successfully',
        success: true,
        statusCode: httpStatus.CREATED,
        data: { user }
    })
})


const getMyProfile = catchAsync( async (req: Request, res: Response, next: NextFunction) => {

    // const {accessToken} = req.cookies;
    // // console.log(req.user, "user request");

    // const verifiedToken = jwtUtils.verifyToken(accessToken, config.jwt_access_secret)

    const profile = await userService.getMyProfilefromDB(req.user?.id as string);


    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "User profile fetched successfully",
        data: { profile }
    })
})

// const getMyProfile = catchAsync(async (req: Request, res: Response, next: NextFunction) => {

//     const { accessToken } = req.cookies;

//     const verifiedToken = jwtUtils.varifyToken(accessToken, config.jwt_access_secret);

//      if(typeof verifiedToken === "string"){
//          throw new Error(verifiedToken);
//      }

//     const profile= await userService.getMyProfilefromDB(verifiedToken.id);

//     sendResponse(res,{
//         success: true,
//         message: "User profile fetched successfully",
//         statusCode: httpStatus.OK,
//         data:{profile}
//     })


// })

export const userController = {
    registerUser,
    getMyProfile
}