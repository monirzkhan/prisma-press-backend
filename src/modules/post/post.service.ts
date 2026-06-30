import { PostStatus } from "../../../generated/prisma/enums"
import { prisma } from "../../lib/prisma"
import { ICreatePost } from "./post.interface"

const gettAllPostsfromB = async () => {
    const posts = await prisma.post.findMany({
        include: {
            author: {
                omit: {
                    password: true
                }
            },
            comments: true
        }
    })

    return posts
}

const createPostIntoDB = async (payload: ICreatePost, userId: string) => {


    const result = await prisma.post.create({
        data: {

            ...payload,
            authorId: userId

        }
    })
    return result
}

const getMyPost = async (authorId: string) => {

    const result = await prisma.post.findMany({
        where: {
            authorId
        },
        include:{
            author:{
                omit:{
                    password: true
                }
            },
            comments: true,
            _count:{
                select:{
                    comments: true
                }
            }
        },
        orderBy:{
            createdAt: "desc"
        },
        
    })

    return result

}

const getSinglePost=async(postid: string)=>{
    const result= await prisma.post.findUniqueOrThrow({
        where:{
            id: postid
        },
        include:{
            author: true
        }

    })

    return result
}

export const postService = {
    gettAllPostsfromB,
    createPostIntoDB,
    getMyPost,
    getSinglePost
} 