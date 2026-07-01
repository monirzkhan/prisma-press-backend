import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utilities/catchAsync";
import { sendResponse } from "../../utilities/sendResponse";
import  HttpStatus  from "http-status";
import { commentService } from "./comment.service";

const createComment=catchAsync(async(req: Request, res: Response, next: NextFunction)=>{
const payload= req.body

const authorId= req.user?.id;

const result= await commentService.createComment(payload, authorId as string);

sendResponse(res,{
    success: true,
    statusCode: HttpStatus.CREATED,
    message: "Comment Created Successfully",
    data: {result}
})
})


export const commentController={
    createComment
} 