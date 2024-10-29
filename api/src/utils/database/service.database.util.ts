import { RecordId } from "surrealdb";

import type { OwnsService } from "#models/owns_service.model";
import type { Service } from "#models/service.model";
import type { User } from "#models/user.model";
import type { Optional } from "#types/optional.types";
import { getById, queryOne } from "#utils/db.util";

export async function createService(
    service: Optional<Optional<Service, "id">, "created_at">,
) {
    return await queryOne<Service>("CREATE service CONTENT $content", {
        content: {
            body: service.body,
            headers: service.headers,
            method: service.method,
            name: service.name,
            url: service.url,
        },
    });
}

export async function createOwnsService(
    ownsService: Optional<OwnsService, "id">,
) {
    return await queryOne<OwnsService>("RELATE $in->owns_service->$out", {
        in: ownsService.in,
        out: ownsService.out,
    });
}

export async function getOwnedServicesByUser(user: User) {
    const ownedServices = await queryOne<OwnsService>(
        "SELECT * FROM owns_service WHERE in = $id",
        { id: user.id },
    );
    const serviceIds = ownedServices.map((service) => service.out);
    const services = [];
    for (const id of serviceIds) {
        const service = await getById<Service>(id as RecordId);
        services.push(service);
    }
    return services;
}
