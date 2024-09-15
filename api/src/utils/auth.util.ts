import jwt from "jsonwebtoken";

import type { User } from "#models/user.model";
import { getById } from "./db.util";

export function getUserFromAccessToken(token: string): Promise<User | null> {
    return new Promise((resolve) => {
        jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
            if (err || !decoded) {
                return resolve(null);
            }

            const user = await getById<User>(decoded as string);
            if (!user) {
                return resolve(null);
            }

            resolve(user);
        });
    });
}
