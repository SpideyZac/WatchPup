import type { Request, Response } from "express";

import type { User } from "#models/user.model";
import type { Request as RequestModel } from "#models/request.model";
import { getUserFromAccessToken } from "#utils/auth.util";
import { getById } from "#utils/db.util";
import { createStandardError } from "#utils/standard.util";
import { doesUserOwnRequest } from "#utils/database/request.database.util";
import type { RecordId } from "surrealdb";

export async function getRequest(req: Request, res: Response) {
    const user = (await getUserFromAccessToken(
        (req.headers.authorization as string).split(" ")[1],
    )) as User;

    // @ts-expect-error requestId is converted to RecordId
    const { requestId } = req.query as { requestId: RecordId };

    const request = await getById<RequestModel>(requestId);
    if (!request) {
        return res.status(400).json(createStandardError("Request not found"));
    }

    const ownsRequest = await doesUserOwnRequest(user, requestId);
    if (!ownsRequest) {
        return res.status(403).json(createStandardError("You do not own this request"));
    }

    console.info(`User ${user.id} fetched request ${requestId}`);
    return res.status(200).json({ request });
}