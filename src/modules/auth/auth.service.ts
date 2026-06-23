import { prisma } from "../../lib/prisma";
import { ILogin } from "./auth.interface";
import bcrypt from "bcrypt";

const loginUserFromDB = async (payload: ILogin) => {

    const { email, password } = payload;

    const user = await prisma.user.findUniqueOrThrow({
        where: {
            email
        }
    })

    const isPasswordMatched = await bcrypt.compare(password, user.password);

    if(!isPasswordMatched){
        throw new Error('Invalid credentials');
    }
    return user;

}

export const authservice = {
    loginUserFromDB
}