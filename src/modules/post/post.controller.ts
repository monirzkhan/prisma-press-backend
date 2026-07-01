import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utilities/catchAsync";
import { postService } from "./post.service";
import { send } from "process";
import { sendResponse } from "../../utilities/sendResponse";
import HttpStatus from "http-status";
import { prisma } from "../../lib/prisma";

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

    sendResponse(res, {
        success: true,
        statusCode: HttpStatus.CREATED,
        message: "Post Created Successfully",
        data: {
            result
        }
    })


})

const getStats = catchAsync(async (req: Request, res: Response, next: NextFunction) => {

    const result = await postService.getPostsStats();

    sendResponse(res, {
        success: true,
        statusCode: HttpStatus.OK,
        message: "Posts Stats Retrived Successfully",
        data: result
    })

})
const getMyPosts = catchAsync(async (req: Request, res: Response, next: NextFunction) => {

    const authorId = req.user?.id;

    const result = await postService.getMyPost(authorId as string)

    sendResponse(res, {
        success: true,
        statusCode: HttpStatus.OK,
        message: "My Post Retrived Successfully",
        data: { result }
    })

})
const getSinglePost = catchAsync(async (req: Request, res: Response, next: NextFunction) => {

    const postId = req.params.postId;

    if (!postId) {
        throw new Error("PostId is required in Params")
    }

    const result = await postService.getSinglePost(postId as string)
    sendResponse(res, {
        success: true,
        statusCode: HttpStatus.OK,
        message: "Post Retrived Successfully",
        data: { result }
    })

})
const updatePost = catchAsync(async (req: Request, res: Response, next: NextFunction) => {

    const postId = req.params.postId;
    if (!postId) {
        throw new Error("Post Id Required In Params")
    }
    const authorId = req.user?.id;
    const isAdmin = req.user?.role === "ADMIN";
    const payload = req.body;

    const result = await postService.updatePost(postId as string, payload, authorId as string , isAdmin)

    sendResponse(res, {
        success: true,
        statusCode: HttpStatus.OK,
        message: "Post Updated Successfully",
        data: { result }
    })

})
const deletePost = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
const postId = req.params.postId;
    if (!postId) {
        throw new Error("Post Id Required In Params")
    }
    const authorId = req.user?.id;
    const isAdmin = req.user?.role === "ADMIN";
    

    const result = await postService.deletePost(postId as string, authorId as string , isAdmin)

    sendResponse(res, {
        success: true,
        statusCode: HttpStatus.OK,
        message: "Post Deleted Successfully",
        data: { result }
    })
})
export const postController = {
    getAllPosts,
    createPost,
    getStats,
    getMyPosts,
    getSinglePost,
    updatePost,
    deletePost
}