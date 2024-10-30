export function createStandardError(message: string) {
    return {
        errors: [
            {
                message,
            },
        ],
    };
}
