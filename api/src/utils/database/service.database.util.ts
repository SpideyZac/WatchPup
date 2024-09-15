import type { OwnsService } from "#models/owns_service.model";
import type { Service } from "#models/service.model";
import type { Optional } from "#types/optional.types";
import { queryOne } from "#utils/db.util";

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
    return await queryOne<OwnsService>("CREATE owns_service CONTENT $content", {
        content: {
            in: ownsService.in,
            out: ownsService.out,
        },
    });
}
