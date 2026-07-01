import { CommentStatus } from "../../../generated/prisma/enums"

export interface ICreateComment {
    content: string,
    postId: string,
    authorId: string
}

export interface IUpdateComment {
    content?: string,
    status?: CommentStatus
}
export interface IModerateComment {

    status?: CommentStatus
}