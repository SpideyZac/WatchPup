declare let self: Worker;

import type { Request } from "#models/request.model";
import type { Service } from "#models/service.model";
import type { Optional } from "#types/optional.type";
import { connect, db } from "#utils/db.util";

const TIMEOUT_MS = 5000; // 5 second timeout
const MAX_RESPONSE_SIZE = 1024; // 1 KB
const CHECK_INTERVAL = 30 * 60 * 1000; // 30 minutes

async function checkService(
    service: Service,
): Promise<Optional<Request, "id"> | string> {
    const startTime = performance.now();

    try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), TIMEOUT_MS);

        const response = await fetch(service.url, {
            method: service.method,
            signal: controller.signal,
            headers: {
                "User-Agent": "WatchPup/1.0",
            },
        });

        clearTimeout(timeoutId);

        let responseText = "";
        let totalSize = 0;

        const reader = response.body?.getReader();
        if (!reader) {
            throw new Error("Unable to read response");
        }

        while (true) {
            const { done, value } = await reader.read();
            if (done) {
                break;
            }

            totalSize += value.byteLength;
            if (totalSize > MAX_RESPONSE_SIZE) {
                throw new Error("Response too large");
            }

            responseText += new TextDecoder().decode(value, { stream: true });
        }

        const endTime = performance.now();

        return {
            created_at: new Date(),
            headers: response.headers.toJSON(),
            response: responseText,
            response_time: Math.round(endTime - startTime),
            status: response.status,
        };
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
        let errorMessage: string;

        if (error.name === "AbortError") {
            errorMessage = "Request timed out";
        } else if (error.message === "Response too large") {
            errorMessage = "Response exceeds size limit";
        } else {
            errorMessage = "Internal server error";
        }

        return errorMessage;
    }
}

async function monitorServices() {
    try {
        const services = (
            await db.query<Service[][]>("SELECT * FROM service")
        )[0];

        for (const service of services) {
            const request = await checkService(service);

            if (typeof request !== "string") {
                const response = request as Request;
                const requestDb = (
                    await db.query<Request[][]>(
                        "CREATE request CONTENT $content",
                        {
                            content: {
                                created_at: response.created_at,
                                headers: response.headers,
                                response: response.response,
                                response_time: response.response_time,
                                status: response.status,
                            },
                        },
                    )
                )[0][0];
                await db.query("RELATE $in->requested_service->$out", {
                    in: requestDb.id,
                    out: service.id,
                });
            }
        }
    } catch (error) {
        console.error("Error monitoring services:", error);
    }
}

self.addEventListener("message", async (event) => {
    // { type, payload }
    const { type } = event.data;
    switch (type) {
        case "init":
            await connect();
            setInterval(monitorServices, CHECK_INTERVAL);
            monitorServices();
            break;
        case "checkNow":
            monitorServices();
            break;
        default:
            break;
    }
});
