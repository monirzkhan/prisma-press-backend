import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utilities/catchAsync";
import { sendResponse } from "../../utilities/sendResponse";
import HttpStatus from "http-status";
import { commentService } from "./comment.service";

const createComment = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const payload = req.body

    const authorId = req.user?.id;

    const result = await commentService.createComment(payload, authorId as string);

    sendResponse(res, {
        success: true,
        statusCode: HttpStatus.CREATED,
        message: "Comment Created Successfully",
        data: { result }
    })
})
const getCommentByAuthorId = catchAsync(async (req: Request, res: Response, next: NextFunction) => {


    const authorId = req.params.authorId;

    const result = await commentService.getCommentByAuthorId(authorId as string);

    sendResponse(res, {
        success: true,
        statusCode: HttpStatus.OK,
        message: "Comment Retrived Successfully",
        data: { result }
    })
})
const getCommentByPostId = catchAsync(async (req: Request, res: Response, next: NextFunction) => {


    const postid = req.params.postId;

    const result = await commentService.getCommentByPostId(postid as string);

    sendResponse(res, {
        success: true,
        statusCode: HttpStatus.OK,
        message: "Comment Retrived Successfully",
        data: { result }
    })
})
const updateComment = catchAsync(async (req: Request, res: Response, next: NextFunction) => {


    const { commentsId } = req.params;
    // console.log(req.params);
    const isAdmin = req.user?.role === "ADMIN";
    const authorId = req.user?.id;
    const payload = req.body

    const result = await commentService.updateComment(commentsId as string, isAdmin, authorId as string, payload);

    sendResponse(res, {
        success: true,
        statusCode: HttpStatus.OK,
        message: "Comment updated Successfully",
        data: { result }
    })
})


export const commentController = {
    createComment,
    getCommentByAuthorId,
    getCommentByPostId,
    updateComment
} 