import { CommentStatus, PostStatus } from "../../../generated/prisma/enums"
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

    // await prisma.post.update({
    //     where:{
    //         id: postid
    //     },
    //     data:{
    //         views:{
    //             increment: 1
    //         }
    //     }
    // });

    // throw new Error('Fake error');

    // const result= await prisma.post.findUniqueOrThrow({
    //     where:{
    //         id: postid
    //     },
        
    //     include:{
    //         author: {
    //             omit:{
    //                 password: true
    //             }
    //         },
           
    //         comments: {
    //             where:{
    //                 status: CommentStatus.APPROVED
    //             },
    //             orderBy:{
    //                 createdAt:"desc"
    //             }
    //         },
            
    //         _count:{
    //             select:{
    //                 comments: true
    //             }
    //         }
    //     }

    // })

    // return result

    const transactionResult= await prisma.$transaction(
        async(tx)=>{
            await tx.post.update({
                where: {
                    id: postid
                },
                data:{
                    views:{
                        increment: 1
                    }
                }
            })
            // throw new Error('Fake error');

            const result= await tx.post.findUniqueOrThrow({
                where:{
                    id: postid
                },
                include:{
                    author:{
                        omit:{
                            password: true
                        }
                    },
                    comments:{
                        where:{
                            status:"APPROVED"
                        },
                        orderBy:{
                            createdAt: "desc"
                        }
                    },
                    _count:{
                        select:{
                            comments:true
                        }
                    }
                }

            })
            return result
        }
    )
    return transactionResult
}

export const postService = {
    gettAllPostsfromB,
    createPostIntoDB,
    getMyPost,
    getSinglePost
} 