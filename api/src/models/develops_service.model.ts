import type { Service } from "#models/service.model";
import type { User } from "#models/user.model";

export type DevelopsService = {
    id: string;
    can_edit: boolean;
    in: User | string;
    out: Service | string;
};
