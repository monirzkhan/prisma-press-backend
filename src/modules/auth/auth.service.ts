import config from "../../config";
import { prisma } from "../../lib/prisma";
import { jwtUtils } from "../../utilities/jwt";
import { ILogin } from "./auth.interface";
import bcrypt from "bcrypt";
import jwt, { SignOptions } from "jsonwebtoken";

const loginUserFromDB = async (payload: ILogin) => {

    const { email, password } = payload;

    const user = await prisma.user.findUniqueOrThrow({
        where: {
            email
        }
    })

    const isPasswordMatched = await bcrypt.compare(password, user.password);

    if (!isPasswordMatched) {
        throw new Error('Invalid credentials');

    }

    const jwtPayload = {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role
    }

    // const accessToken = jwt.sign(
    //     jwtPayload, 
    //     config.jwt_access_secret, 
    //     {
    //     expiresIn: config.jwt_access_expire_in
    //     } as SignOptions
    // );

    const accessToken = jwtUtils.createToken(
        jwtPayload,
        config.jwt_access_secret,
        config.jwt_access_expire_in as SignOptions
    )

    const refreshToken = jwtUtils.createToken(
        jwtPayload,
        config.jwt_refresh_secret,
        config.jwt_refresh_expire_in as SignOptions
    )


    return {
        accessToken, refreshToken
    };

}

export const authservice = {
    loginUserFromDB
}