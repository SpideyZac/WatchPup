import type { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { RecordId } from "surrealdb";

import type { User } from "#models/user.model";
import { getById } from "#utils/db.util";

export async function authMiddleware(
    req: Request,
    res: Response,
    next: NextFunction,
) {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    const token = authHeader.split(" ")[1];
    if (!token) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET) as {
            id: string;
        };
        const user = await getById<User>(
            new RecordId("user", decoded.id.split(":")[1]),
        );
        if (!user) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        next();
    } catch {
        return res.status(401).json({ message: "Unauthorized" });
    }
}
