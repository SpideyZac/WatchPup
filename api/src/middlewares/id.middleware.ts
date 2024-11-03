import type { NextFunction, Request, Response } from "express";
import { RecordId } from "surrealdb";

import { createStandardError } from "#utils/standard.util";

// create a RecordId from string in body
export function createRecordId(bodyKeys: string[]) {
    return (req: Request, res: Response, next: NextFunction) => {
        if (req.method !== "GET") {
            for (const key of bodyKeys) {
                if (req.body[key]) {
                    if (req.body[key].includes(":")) {
                        return res
                            .status(400)
                            .json(createStandardError("Invalid RecordId"));
                    }
                    const spl = req.body[key].split(":");
                    req.body[key] = new RecordId(spl[0], spl[1]);
                }
            }
            next();
        } else {
            for (const key of bodyKeys) {
                if (req.query[key]) {
                    if (!(req.query[key] as string).includes(":")) {
                        return res
                            .status(400)
                            .json(createStandardError("Invalid RecordId"));
                    }
                    const spl = (req.query[key] as string).split(":");
                    // @ts-expect-error query[key] is converted to RecordId
                    req.query[key] = new RecordId(spl[0], spl[1]);
                }
            }
            next();
        }
    };
}
