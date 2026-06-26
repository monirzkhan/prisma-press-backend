import { NextFunction, Request, RequestHandler, Response } from "express";
import { sendResponse } from "./sendResponse";
import httpStatus from "http-status";

export const catchAsync = (fn: RequestHandler) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            await fn(req, res, next);
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
};