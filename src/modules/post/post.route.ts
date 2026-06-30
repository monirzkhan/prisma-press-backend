import { Router } from "express";
import { postController } from "./post.controller";
import { auth } from "../../middleware/auth";

const router = Router();

router.get('/',postController.getAllPosts)
router.post('/',auth("ADMIN", "AUTHOR", "USER"), postController.createPost)
router.get('/stats',auth("ADMIN"), postController.getStats)
router.get('/my-posts',auth("ADMIN", "AUTHOR", "USER"), postController.getMyPosts)
router.get('/:postId', postController.getSinglePost)
router.patch('/:postId',auth("ADMIN", "AUTHOR", "USER"), postController.updatePost)
router.delete('/:postId',auth("ADMIN", "AUTHOR", "USER"), postController.deletePost)

export const postRoutes = router
