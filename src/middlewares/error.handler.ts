import { Request, Response, NextFunction } from "express";
import { AppError } from "../lib/AppError";

export const notFound = (_req: Request, res: Response) => {
    res.status(404).json({ error: "Route not found" });
};

export const errorHandler = (
    err: any, _req: Request, res: Response, _next: NextFunction
) => {
    if (err instanceof AppError) {
        return res.status(err.status).json({ error: err.message });
    }
    if (err?.type === "entity.parse.failed") {
        return res.status(400).json({ error: "Malformed JSON body" });
    }
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
};