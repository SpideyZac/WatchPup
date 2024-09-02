import { queryOne } from "#utils/db.utils";
import type { User } from "#models/user.model";
import type { Optional } from "#types/optional.types";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function findOne(conditions: string[], parameters: { [key: string]: any }) {
    return await queryOne<User>(
        `SELECT * FROM users WHERE ${conditions.join(" AND ")}`,
        parameters,
    );
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function find(conditions: string[], parameters: { [key: string]: any }) {
    return await queryOne<User>(`SELECT * FROM users WHERE ${conditions.join(" AND ")}`, parameters);
}

export async function create(user: Optional<Optional<User, "id">, "created_at">) {
    return await queryOne<User>("CREATE user CONTENT $content", {
        content: {
            email: user.email,
            password: user.password,
            username: user.username,
        },
    });
}