declare let self: Worker;

import type { Request } from "#models/request.model";
import { config } from "#utils/config.util";
import { connect, db } from "#utils/db.util";

async function checkRequests(): Promise<void> {
    const timeToCheck = Date.now() - config.requests.requestLifetime;
    const timeToCheckDate = new Date(timeToCheck);
    const requests = (
        await db.query<Request[][]>(
            "SELECT * FROM request WHERE created_at <= $time",
            {
                time: timeToCheckDate,
            },
        )
    )[0];

    for (const request of requests) {
        console.info(`Request ${request.id} expired`);
    }

    await db.query("DELETE request WHERE created_at <= $time", {
        time: timeToCheckDate,
    });
}

self.addEventListener("message", async (event) => {
    // { type, payload }
    const { type } = event.data;
    switch (type) {
        case "init":
            await connect();
            setInterval(
                checkRequests,
                config.requests.requestLifetimeCheckInterval,
            );
            checkRequests();
            break;
        default:
            break;
    }
});
