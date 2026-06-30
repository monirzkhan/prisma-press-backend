import { Router } from "express";
import { postController } from "./post.controller";
import { auth } from "../../middleware/auth";

const router = Router();

router.get('/',postController.getAllPosts)
router.post('/',auth("ADMIN", "AUTHOR", "USER"), postController.createPost)

export const postRoutes = router
