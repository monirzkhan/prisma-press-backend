import { CommentStatus, PostStatus } from "../../../generated/prisma/enums"
import { prisma } from "../../lib/prisma"
import { ICreatePost, IUpdatePost } from "./post.interface"

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

const getPostsStats = async () => {

    const transactionResult = await prisma.$transaction(
        async (tx) => {

            // const totalPosts = await tx.post.count()
            // const totalPublishedPosts = await tx.post.count({
            //     where: {
            //         status: "PUBLISHED"
            //     }
            // })
            // const totalArchivedPosts = await tx.post.count({
            //     where: {
            //         status: "ARCHIVED"
            //     }
            // })
            // const totalDraftPosts = await tx.post.count({
            //     where: {
            //         status: "DRAFT"
            //     }
            // })
            // const totalComments = await tx.comment.count()
            // const totalApprovedComments = await tx.comment.count({
            //     where: {
            //         status: "APPROVED"
            //     }
            // })
            // const totalRejectComments = await tx.comment.count({
            //     where: {
            //         status: "REJECT"
            //     }
            // })

            // const totalPostsViewAggregate = await tx.post.aggregate({
            //     _sum: {
            //         views: true
            //     }
            // })

            // const totalPostsView = totalPostsViewAggregate._sum.views


            // return {
            //     totalPosts,
            //     totalPublishedPosts,
            //     totalArchivedPosts,
            //     totalDraftPosts,
            //     totalComments,
            //     totalApprovedComments,
            //     totalRejectComments,
            //     totalPostsView
            // };

            const [totalPosts,
                totalPublishedPosts,
                totalArchivedPosts,
                totalDraftPosts,
                totalComments,
                totalApprovedComments,
                totalRejectComments,
                totalPostsView] = await Promise.all([
                    await tx.post.count(),
                    await tx.post.count({
                        where: {
                            status: "PUBLISHED"
                        }
                    }),
                    await tx.post.count({
                        where: {
                            status: "ARCHIVED"
                        }
                    }),
                    await tx.post.count({
                        where: {
                            status: "DRAFT"
                        }
                    }),
                    await tx.comment.count(),
                    await tx.comment.count({
                        where: {
                            status: "APPROVED"
                        }
                    }),
                    await tx.comment.count({
                        where: {
                            status: "REJECT"
                        }
                    }),
                    await tx.post.aggregate({
                        _sum: {
                            views: true
                        }
                    })
                ])
            return {
                totalPosts,
                totalPublishedPosts,
                totalArchivedPosts,
                totalDraftPosts,
                totalComments,
                totalApprovedComments,
                totalRejectComments,
                totalPostsView: totalPostsView._sum.views
            };


        }
    )

    return transactionResult

}
const getMyPost = async (authorId: string) => {

    const result = await prisma.post.findMany({
        where: {
            authorId
        },
        include: {
            author: {
                omit: {
                    password: true
                }
            },
            comments: true,
            _count: {
                select: {
                    comments: true
                }
            }
        },
        orderBy: {
            createdAt: "desc"
        },

    })

    return result

}

const getSinglePost = async (postid: string) => {

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

    const transactionResult = await prisma.$transaction(
        async (tx) => {
            await tx.post.update({
                where: {
                    id: postid
                },
                data: {
                    views: {
                        increment: 1
                    }
                }
            })
            // throw new Error('Fake error');

            const result = await tx.post.findUniqueOrThrow({
                where: {
                    id: postid
                },
                include: {
                    author: {
                        omit: {
                            password: true
                        }
                    },
                    comments: {
                        where: {
                            status: "APPROVED"
                        },
                        orderBy: {
                            createdAt: "desc"
                        }
                    },
                    _count: {
                        select: {
                            comments: true
                        }
                    }
                }

            })
            return result
        }
    )
    return transactionResult
}

const updatePost = async (postId: string, payload: IUpdatePost, authorId: string, isAdmin: boolean) => {

    const post = await prisma.post.findUniqueOrThrow({
        where: {
            id: postId
        }
    })

    if (!isAdmin && post.authorId !== authorId) {
        throw new Error("You are not the owner of this post!")
    }

    const result = await prisma.post.update({
        where: {
            id: postId
        },
        data: payload,
        include: {
            author: {
                omit: {
                    password: true
                }
            },
            comments: true
        }

    })

    return result;

}



export const postService = {
    gettAllPostsfromB,
    createPostIntoDB,
    getPostsStats,
    getMyPost,
    getSinglePost,
    updatePost
} 