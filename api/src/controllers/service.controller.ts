import type { Request, Response } from "express";

import type { User } from "#models/user.model";
import { getUserFromAccessToken } from "#utils/auth.util";
import { config } from "#utils/config.util";
import {
    createOwnsService,
    createService,
    deleteService,
    getOwnedServicesByUser,
} from "#utils/database/service.database.util";
import { getById } from "#utils/db.util";
import { createStandardError } from "#utils/standard.util";

export async function getService(req: Request, res: Response) {
    const user = (await getUserFromAccessToken(
        (req.headers.authorization as string).split(" ")[1],
    )) as User;
    const { serviceId } = req.body;

    const service = await getById(serviceId);
    if (!service) {
        return res.status(400).json(createStandardError("Service not found"));
    }

    const services = await getOwnedServicesByUser(user);
    if (!services.find((service) => service.id.id == serviceId.id)) {
        return res
            .status(400)
            .json(createStandardError("User does not own service"));
    }

    return res.status(200).json({ service });
}

export async function getOwned(req: Request, res: Response) {
    const user = (await getUserFromAccessToken(
        (req.headers.authorization as string).split(" ")[1],
    )) as User;

    const services = await getOwnedServicesByUser(user);
    return res.status(200).json({ services });
}

export async function create(req: Request, res: Response) {
    const user = (await getUserFromAccessToken(
        (req.headers.authorization as string).split(" ")[1],
    )) as User;
    const { method, name, url } = req.body;

    const services = await getOwnedServicesByUser(user);
    if (services.length >= config.services.maxServices) {
        return res.status(400).json({
            message: `User has reached the maximum number of services (${config.services.maxServices})`,
        });
    }

    const service = await createService({
        method,
        name,
        url,
    });
    if (!service) {
        return res
            .status(500)
            .json(createStandardError("Failed to create service"));
    }

    const ownsService = await createOwnsService({
        in: user.id,
        out: service[0].id,
    });
    if (!ownsService) {
        return res
            .status(500)
            .json(
                createStandardError(
                    "Failed to create owns_service relationship",
                ),
            );
    }

    return res.status(201).json({ message: "Service created successfully" });
}

export async function deleteOwnedService(req: Request, res: Response) {
    const user = (await getUserFromAccessToken(
        (req.headers.authorization as string).split(" ")[1],
    )) as User;
    const { serviceId } = req.body;

    const services = await getOwnedServicesByUser(user);
    if (!services.find((service) => service.id.id == serviceId.id)) {
        return res
            .status(400)
            .json(createStandardError("User does not own service"));
    }

    await deleteService(serviceId);
    return res.status(200).json({ message: "Service deleted successfully" });
}
