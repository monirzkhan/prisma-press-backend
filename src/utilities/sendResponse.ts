import { Response } from "express";

type TMeta = {
    page: number;
    limit: number;
    total: number;

}

type TResponseData<T> = {
    message: string;
    success: boolean;
    statusCode: number;
    data: T;
    meta?: TMeta
}

export const sendResponse = <T>(res: Response, data: TResponseData<T>) => {
    res.status(data.statusCode).json({
        message: data.message,
        success: data.success,
        statusCode: data.statusCode,
        data: data.data,
        meta: data.meta
    })

}
