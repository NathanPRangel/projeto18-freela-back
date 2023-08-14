import { Router } from "express";
import { PostValidation } from "../middlewares/posts.middleware.js";
import { authValidation } from "../middlewares/auth.middlewares.js";
import { createPost, getAllPostById, getPostById, getPosts, updatePost } from "../controllers/posts.controller.js";

export const postsRouter = Router()

postsRouter.get('/posts', getPosts)
postsRouter.post('/posts',authValidation, PostValidation, createPost)
postsRouter.get('/posts/:id', getPostById)
postsRouter.put('/posts/edit', updatePost)
postsRouter.get('/posts/edit/:id', getAllPostById)

export default postsRouter