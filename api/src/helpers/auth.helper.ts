import jwt from "jsonwebtoken";

import type { User } from "#models/user.model";
import type { Optional } from "#types/optional.types";

export function generateAccessToken(user: User, expiresIn: string): string {
    return jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
        expiresIn,
    });
}

export async function checkPassword(
    password: string,
    hash: string,
): Promise<boolean> {
    return await Bun.password.verify(password, hash);
}

export async function hashPassword(password: string): Promise<string> {
    return await Bun.password.hash(password);
}

export async function createUserData(
    email: string,
    password: string,
    username: string,
): Promise<Optional<Optional<User, "id">, "created_at">> {
    return {
        email,
        password: await hashPassword(password),
        username,
        verified: false,
    };
}
