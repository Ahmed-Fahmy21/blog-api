import { Request, Response, NextFunction } from "express";
import { z } from "zod";

export const validate =
    (schema: z.ZodType) => (req: Request, res: Response, next: NextFunction) => {
        const result = schema.safeParse(req.body);
        if (!result.success) {
            return res.status(400).json({
                error: "Validation failed",
                details: result.error.issues.map((i) => ({
                    field: i.path.join("."),
                    message: i.message,
                })),
            });
        }
        req.body = result.data;
        next();
    };