import type { User } from "#models/user.model";
import type { Optional } from "#types/optional.types";
import { queryOne } from "#utils/db.util";

export async function find(
    conditions: string,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    parameters: { [key: string]: any },
) {
    return await queryOne<User>(
        `SELECT * FROM users WHERE ${conditions}`,
        parameters,
    );
}

export async function create(
    user: Optional<Optional<User, "id">, "created_at">,
) {
    return await queryOne<User>("CREATE user CONTENT $content", {
        content: {
            email: user.email,
            password: user.password,
            username: user.username,
            verified: user.verified,
        },
    });
}
