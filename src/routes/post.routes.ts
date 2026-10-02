import { Router } from "express";
import {
    getPosts, createPost, updatePost, deletePost,
} from "../controllers/post.controller";
import { authenticate } from "../middlewares/auth";
import { validate } from "../middlewares/validate";
import { postSchema } from "../validators/post.schema";

const router = Router();
router.get("/", getPosts);
router.post("/", authenticate, validate(postSchema), createPost);
router.put("/:id", authenticate, validate(postSchema), updatePost);
router.delete("/:id", authenticate, deletePost);

export default router;