import { prisma } from "../../lib/prisma";
import { ICreateComment, IUpdateComment } from "./comment.interface";

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

        where: {
            authorId
        },
        orderBy: {
            createdAt: "desc"
        },
        include: {
            post: {
                select: {
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

        where: {
            postId
        },
        orderBy: {
            createdAt: "desc"
        },
        include: {
            post: {
                select: {
                    id: true,
                    title: true
                }
            }
        }
    })

    return result

}
const updateComment = async (commentId: string, isAdmin: boolean, authorId: string, data: IUpdateComment) => {

    const commentData = await prisma.comment.findUniqueOrThrow({
        where: {
            id: commentId,
            authorId
        },
        select:{
            id: true
        }

    })

    if(!commentData){
        throw new Error('Comments not Avaiable')
    }

    if (!isAdmin &&  !authorId) {
        throw new Error("You are not the owner of this post!")
    }
    
    const result= await prisma.comment.update({
        where:{
            id: commentId,
            authorId
        },
        data 
    })
    return result

}

export const commentService = {
    createComment,
    getCommentByAuthorId,
    getCommentByPostId,
    updateComment
} 