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
const getCommentByAuthorId = async (authorId: string) => {

    const result = await prisma.comment.findMany({

        where:{
            authorId
        },
        orderBy:{
            createdAt:"desc"
        },
        include:{
            post:{
                select:{
                    id: true,
                    title: true
                }
            }
        }
    })

    return result

}
const getCommentByPostId = async (postId: string) => {

    const result = await prisma.comment.findMany({

        where:{
            postId
        },
        orderBy:{
            createdAt:"desc"
        },
        include:{
            post:{
                select:{
                    id: true,
                    title: true
                }
            }
        }
    })

    return result

}

export const commentService = {
    createComment,
    getCommentByAuthorId,
    getCommentByPostId
} 