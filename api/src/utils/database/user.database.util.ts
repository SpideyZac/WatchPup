import type { User } from "#models/user.model";
import type { Optional } from "#types/optional.types";
import { queryOne } from "#utils/db.util";

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
