import jwt, { type JwtPayload } from "jsonwebtoken";
import { RecordId } from "surrealdb";

import type { User } from "#models/user.model";
import { getById } from "#utils/db.util";

export function getUserFromAccessToken(token: string): Promise<User | null> {
    return new Promise((resolve) => {
        jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
            if (err || !decoded) {
                return resolve(null);
            }

            const user = await getById<User>(
                new RecordId(
                    "user",
                    ((decoded as JwtPayload).id as string).split(":")[1],
                ),
            );
            if (!user) {
                return resolve(null);
            }

            resolve(user);
        });
    });
}
