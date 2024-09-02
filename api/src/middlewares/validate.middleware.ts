import type { NextFunction, Request, Response } from "express";
import { z, ZodError } from "zod";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function validateData(schema: z.ZodObject<any, any>) {
    return (req: Request, res: Response, next: NextFunction) => {
        try {
            schema.parse(req.body);
            next();
        } catch (error) {
            if (error instanceof ZodError) {
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                const errorMessages = error.errors.map((issue: any) => ({
                    message: `${issue.path.join(".")} is ${issue.message}`,
                }));
                res.status(400).json({ errors: errorMessages });
            } else {
                next(error);
            }
        }
    };
}
