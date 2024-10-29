import { RecordId } from "surrealdb.js";

import type { Service } from "#models/service.model";
import type { User } from "#models/user.model";

export type OwnsService = {
    id: RecordId;
    in: User | RecordId;
    out: Service | RecordId;
};
