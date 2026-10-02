import { Router } from "express";
import {
    getPosts, createPost, updatePost, deletePost,
} from "../controllers/post.controller.js";
import { authenticate } from "../middlewares/auth.js";
import { validate } from "../middlewares/validate.js";
import { postSchema } from "../validators/post.schema.js";

const router = Router();
router.get("/", getPosts);
router.post("/", authenticate, validate(postSchema), createPost);
router.put("/:id", authenticate, validate(postSchema), updatePost);
router.delete("/:id", authenticate, deletePost);

export default router;