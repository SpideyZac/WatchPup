import { RecordId } from "surrealdb";

import type { RequestedService } from "#models/requested_service.model";
import type { User } from "#models/user.model";
import { queryOne } from "#utils/db.util";
import { getOwnedServicesByUser } from "./service.database.util";

export async function doesUserOwnRequest(user: User, request: RecordId) {
    const requested_service = await queryOne<RequestedService>(
        "SELECT * FROM requested_service WHERE in = $request",
        {
            request,
        },
    );

    if (!requested_service) {
        return false;
    }

    const services = await getOwnedServicesByUser(user);
    return services.find(
        (service) => service.id.id === requested_service[0].out.id,
    );
}
