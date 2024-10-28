import type { Request, Response } from "express";

import type { User } from "#models/user.model";
import { getUserFromAccessToken } from "#utils/auth.util";
import {
    createOwnsService,
    createService,
    getOwnedServicesByUser,
} from "#utils/database/service.database.util";
import { config } from "#utils/config.util";

export async function create(req: Request, res: Response) {
    const user = (await getUserFromAccessToken(
        (req.headers.authorization as string).split(" ")[1],
    )) as User;
    const { body, headers, method, name, url } = req.body;

    const services = await getOwnedServicesByUser(user);
    if (services.length >= config.services.maxServices) {
        return res.status(400).json({
            message: `User has reached the maximum number of services (${config.services.maxServices})`,
        });
    }

    const service = await createService({
        body,
        headers,
        method,
        name,
        url,
    });
    if (!service) {
        return res.status(500).json({ message: "Failed to create service" });
    }

    const ownsService = await createOwnsService({
        in: user.id,
        out: service[0].id,
    });
    if (!ownsService) {
        return res
            .status(500)
            .json({ message: "Failed to create owns_service" });
    }

    return res.status(201).json({ message: "Service created successfully" });
}

export async function getOwned(req: Request, res: Response) {
    const user = (await getUserFromAccessToken(
        (req.headers.authorization as string).split(" ")[1],
    )) as User;

    const services = await getOwnedServicesByUser(user);
    return res.status(200).json({ services });
}
