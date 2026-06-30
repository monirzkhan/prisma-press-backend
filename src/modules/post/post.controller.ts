import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utilities/catchAsync";
import { postService } from "./post.service";
import { send } from "process";
import { sendResponse } from "../../utilities/sendResponse";
import HttpStatus from "http-status";

const getAllPosts = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    // res.send('Hi from Post Controller')

    // const payload = req.body
    const result = await postService.gettAllPostsfromB()

    sendResponse(res, {
        success: true,
        statusCode: HttpStatus.OK,
        message: "All Posts Retrived Successfully",
        data: { result }
    })
})

const createPost = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const id = req.user?.id
    const payload = req.body

    const result = await postService.createPostIntoDB(payload, id as string)

    sendResponse(res,{
        success: true,
        statusCode: HttpStatus.CREATED,
        message: "Post Created Successfully",
        data:{
            result
        }
    })


})
export const postController = {
    getAllPosts,
    createPost
}