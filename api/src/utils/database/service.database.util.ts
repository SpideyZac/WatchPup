import { RecordId } from "surrealdb";

import type { OwnsService } from "#models/owns_service.model";
import type { Service } from "#models/service.model";
import type { User } from "#models/user.model";
import type { Optional } from "#types/optional.type";
import { getById, queryOne } from "#utils/db.util";

export async function getOwnedServicesByUser(user: User) {
    const ownedServices = await queryOne<OwnsService>(
        "SELECT * FROM owns_service WHERE in = $id",
        { id: user.id },
    );
    const serviceIds = ownedServices.map((service) => service.out);
    const services = [];
    for (const id of serviceIds) {
        const service = (await getById<Service>(id as RecordId)) as Service;
        services.push(service);
    }
    return services;
}

export async function createService(
    service: Optional<Optional<Service, "id">, "created_at">,
) {
    return await queryOne<Service>("CREATE service CONTENT $content", {
        content: {
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

export async function editService(
    serviceId: RecordId,
    name: string | undefined,
    method: string | undefined,
    url: string | undefined,
) {
    const sets = [];
    if (name) {
        sets.push(`name=$name`);
    }
    if (method) {
        sets.push(`method=$method`);
    }
    if (url) {
        sets.push(`url=$url`);
    }
    return await queryOne<Service>(
        `UPDATE service SET ${sets.join(", ")} WHERE id=$id`,
        {
            id: serviceId,
            name,
            method,
            url,
        },
    );
}

export async function deleteService(serviceId: RecordId) {
    return await queryOne<Service>("DELETE service WHERE id=$id", {
        id: serviceId,
    });
}
