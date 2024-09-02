import type { User } from "#models/user.model";
import type { Optional } from "#types/optional.types";

export async function hashPassword(password: string): Promise<string> {
    return await Bun.password.hash(password);
}

export async function createUserData(email: string, password: string, username: string): Promise<Optional<User, "id">> {
    return {
        email,
        password: await hashPassword(password),
        username,
        created_at: new Date(),
    };
}