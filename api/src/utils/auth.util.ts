import jwt from "jsonwebtoken";

import type { User } from "#models/user.model";
import { queryOne } from "./db.util";

export function getUserFromAccessToken(token: string): Promise<User | null> {
    return new Promise((resolve) => {
        jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
            if (err || !decoded) {
                return resolve(null);
            }

            const user = await queryOne<User>("SELECT * FROM $id", {
                id: decoded,
            });
            if (user.length === 0) {
                return resolve(null);
            }

            resolve(user[0]);
        });
    });
}
