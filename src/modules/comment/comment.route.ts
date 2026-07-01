import { Router } from "express";
import { commentController } from "./comment.controller";
import { auth } from "../../middleware/auth";

const router = Router();

router.post('/', auth('ADMIN', 'AUTHOR', "USER"),commentController.createComment)
// router.get('/author/:authorId', )
// router.get('/comments/:commentId')

export const commentRoutes = router;