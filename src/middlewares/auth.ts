import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { AppError } from "../lib/AppError.js";

declare global {
    namespace Express {
        interface Request {
            userId?: number;
        }
    }
}

export const authenticate = (req: Request, _res: Response, next: NextFunction) => {
    const header = req.headers.authorization;
    if (!header?.startsWith("Bearer ")) {
        throw new AppError(401, "Authentication required");
    }

    try {
        const payload = jwt.verify(header.slice(7), process.env.JWT_SECRET!) as {
            userId: number;
        };
        req.userId = payload.userId;
    } catch {
        throw new AppError(401, "Invalid or expired token");
    }
    next();
};