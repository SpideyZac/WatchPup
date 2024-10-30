import type { NextFunction, Request, Response } from "express";
import { RecordId } from "surrealdb";

// create a RecordId from string in body
export function createRecordId(bodyKeys: string[]) {
    return (req: Request, res: Response, next: NextFunction) => {
        for (const key of bodyKeys) {
            if (req.body[key]) {
                const spl = req.body[key].split(":");
                req.body[key] = new RecordId(spl[0], spl[1]);
            }
        }
        next();
    };
}
