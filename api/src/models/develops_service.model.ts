import { RecordId } from "surrealdb.js";

import type { Service } from "#models/service.model";
import type { User } from "#models/user.model";

export type DevelopsService = {
    id: RecordId;
    can_edit: boolean;
    in: User | RecordId;
    out: Service | RecordId;
};
