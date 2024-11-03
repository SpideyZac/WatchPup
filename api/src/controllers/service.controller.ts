import type { Request, Response } from "express";
import type { RecordId } from "surrealdb";

import type { Service } from "#models/service.model";
import type { User } from "#models/user.model";
import { getUserFromAccessToken } from "#utils/auth.util";
import { config } from "#utils/config.util";
import {
    createOwnsService,
    createService,
    deleteService,
    editService,
    getOwnedServicesByUser,
    getRequestsByService,
} from "#utils/database/service.database.util";
import { getById } from "#utils/db.util";
import { createStandardError } from "#utils/standard.util";

export async function getService(req: Request, res: Response) {
    const user = (await getUserFromAccessToken(
        (req.headers.authorization as string).split(" ")[1],
    )) as User;
    // @ts-expect-error serviceId is converted to RecordId
    const { serviceId } = req.query as { serviceId: RecordId };

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

    console.info(`User ${user.id} fetched service ${serviceId}`);
    return res.status(200).json({ service });
}

export async function getOwned(req: Request, res: Response) {
    const user = (await getUserFromAccessToken(
        (req.headers.authorization as string).split(" ")[1],
    )) as User;

    const services = await getOwnedServicesByUser(user);
    console.info(`User ${user.id} fetched owned services`);
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

    console.info(`User ${user.id} created service ${service[0].id}`);
    return res.status(201).json({ message: "Service created successfully" });
}

export async function editOwnedService(req: Request, res: Response) {
    const user = (await getUserFromAccessToken(
        (req.headers.authorization as string).split(" ")[1],
    )) as User;
    const { serviceId, name, method, url } = req.body;

    if (!name && !method && !url) {
        return res.status(400).json(createStandardError("No fields to edit"));
    }

    const services = await getOwnedServicesByUser(user);
    if (!services.find((service) => service.id.id == serviceId.id)) {
        return res
            .status(400)
            .json(createStandardError("User does not own service"));
    }

    await editService(serviceId, name, method, url);
    console.info(`User ${user.id} edited service ${serviceId}`);
    return res.status(200).json({ message: "Service edited successfully" });
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
    console.info(`User ${user.id} deleted service ${serviceId}`);
    return res.status(200).json({ message: "Service deleted successfully" });
}

export async function getRequests(req: Request, res: Response) {
    const user = (await getUserFromAccessToken(
        (req.headers.authorization as string).split(" ")[1],
    )) as User;
    // @ts-expect-error serviceId is converted to RecordId
    const { serviceId } = req.query as { serviceId: RecordId };

    const service = await getById<Service>(serviceId);
    if (!service) {
        return res.status(400).json(createStandardError("Service not found"));
    }

    const services = await getOwnedServicesByUser(user);
    if (!services.find((service) => service.id.id == serviceId.id)) {
        return res
            .status(400)
            .json(createStandardError("User does not own service"));
    }

    const requests = await getRequestsByService(service);
    console.info(`User ${user.id} fetched requests for service ${serviceId}`);
    return res.status(200).json({ requests });
}
