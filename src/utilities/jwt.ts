import jwt, { JwtPayload, SignOptions } from "jsonwebtoken";
import { sendResponse } from "./sendResponse";
import httpStatus from "http-status";

interface ITokenPayload extends JwtPayload {
    id: string;
}

const createToken = (payload: JwtPayload, secret: string, expiresIn: SignOptions) => {
    const token = jwt.sign(payload, secret, {
        expiresIn
    } as SignOptions);
    return token;
}

const verifyToken = (token: string | undefined, secret: string): ITokenPayload => {
    if (!token) {
        throw new Error("Token is required");
    }

    try {
        const verifiedToken = jwt.verify(token, secret) as ITokenPayload;
        return verifiedToken;
    } catch (error: any) {
        console.log("Verify Token Failed", error);
        throw new Error(error.message || "Invalid token");
    }
}

export const jwtUtils = {
    createToken,
    verifyToken
}