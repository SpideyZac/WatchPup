import { RecordId } from "surrealdb";

import type { Request } from "#models/request.model";
import type { Service } from "#models/service.model";

export type RequestedService = {
    id: RecordId;
    in: Request | RecordId;
    out: Service | RecordId;
};
