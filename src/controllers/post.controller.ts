import { Request, Response } from "express";
import { prisma } from "../lib/prisma";
import { AppError } from "../lib/AppError";

const getOwnedPost = async (req: Request) => {
    const id = Number(req.params.id);
    if (!Number.isInteger(id)) throw new AppError(400, "Invalid post id");

    const post = await prisma.post.findUnique({ where: { id } });
    if (!post) throw new AppError(404, "Post not found");
    if (post.authorId !== req.userId) {
        throw new AppError(403, "You can only modify your own posts");
    }
    return post;
};

export const getPosts = async (req: Request, res: Response) => {
    const page = Math.max(Number(req.query.page) || 1, 1);
    const limit = Math.min(Math.max(Number(req.query.limit) || 10, 1), 50);

    const [posts, total] = await Promise.all([
        prisma.post.findMany({
            skip: (page - 1) * limit,
            take: limit,
            orderBy: { createdAt: "desc" },
            include: { author: { select: { id: true, name: true } } },
        }),
        prisma.post.count(),
    ]);

    res.json({ data: posts, page, limit, total });
};

export const createPost = async (req: Request, res: Response) => {
    const { title, content } = req.body;
    const post = await prisma.post.create({
        data: { title, content, authorId: req.userId! },
    });
    res.status(201).json(post);
};

export const updatePost = async (req: Request, res: Response) => {
    const post = await getOwnedPost(req);
    const { title, content } = req.body;
    const updated = await prisma.post.update({
        where: { id: post.id },
        data: { title, content },
    });
    res.json(updated);
};

export const deletePost = async (req: Request, res: Response) => {
    const post = await getOwnedPost(req);
    await prisma.post.delete({ where: { id: post.id } });
    res.status(204).send();
};