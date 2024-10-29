import { RecordId } from "surrealdb";

import type { Service } from "#models/service.model";
import type { User } from "#models/user.model";

export type OwnsService = {
    id: RecordId;
    in: User | RecordId;
    out: Service | RecordId;
};
