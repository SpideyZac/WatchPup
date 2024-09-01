import type { Service } from "#models/service.model";
import type { User } from "#models/user.model";

export type OwnsService = {
    id: string;
    in: User | string;
    out: Service | string;
};
