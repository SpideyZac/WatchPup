import { RecordId, Surreal } from "surrealdb.js";

export const db = new Surreal();

export async function connect() {
    await db.connect(process.env.DB_PRIVATE_URL, {
        auth: {
            username: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
        },
    });
    await db.use({
        namespace: process.env.DB_NAMESPACE,
        database: process.env.DB_DATABASE,
    });
}

export async function queryOne<T>(
    query: string,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    params?: { [k: string]: any },
): Promise<T[]> {
    if (query.includes(";")) {
        throw new Error("queryOne does not support multiple queries");
    }
    const result = await db.query<T[][]>(query, params);
    return result[0];
}

export async function getById<T>(id: RecordId): Promise<T | undefined> {
    return (await queryOne<T>(`SELECT * FROM $id`, { id }))[0];
}
