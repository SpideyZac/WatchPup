import type { Request } from "#models/request.model";
import type { Service } from "#models/service.model";

export type RequestedService = {
    id: string;
    in: Request | string;
    out: Service | string;
};
