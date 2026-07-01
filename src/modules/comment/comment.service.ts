import { prisma } from "../../lib/prisma";
import { ICreateComment } from "./comment.interface";

const createComment = async (payload: ICreateComment, userId: string) => {

    const result = await prisma.comment.create({

        data: {
            ...payload,
            authorId: userId
        }
    })

    return result

}

export const commentService = {
    createComment
} 