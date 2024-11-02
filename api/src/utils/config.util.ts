export const config = {
    services: {
        maxServices: 10,
    },
    requests: {
        maxTimeout: 5000, // 5 seconds
        maxResponseSize: 256, // 256 bytes
        checkInterval: 30 * 60 * 1000, // 30 minutes
        requestLifetime: 24 * 60 * 60 * 1000, // 24 hours
        requestLifetimeCheckInterval: 60 * 60 * 1000, // 1 hour
    },
};
