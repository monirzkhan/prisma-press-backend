import bcrypt from "bcrypt";
import { prisma } from "../../lib/prisma";
import config from "../../config";
import { IUser } from "./user.interface";


const registerUserIntoDB = async (payload: IUser) => {
    const { name, email, password, profilePhoto } = payload;

    const isUserExists = await prisma.user.findUnique({
        where: {
            email: email,
        }
    });

    if (isUserExists) {
        throw new Error('User already exists');

    }

    const hashedPassword = await bcrypt.hash(password, Number(config.bcrypt_salt_rounds));

    const createdUser = await prisma.user.create({
        data: {
            name,
            email,
            password: hashedPassword,

        }
    })

    await prisma.profile.create({
        data: {
            userId: createdUser.id,
            profilePhoto
        }
    })

    const user = await prisma.user.findUnique({
        where: {
            id: createdUser.id,
            email: createdUser.email
        },
        omit: {
            password: true
        },
        include: {
            profile: true
        }
    })
    return user;
}

export const userService = {
    registerUserIntoDB
}