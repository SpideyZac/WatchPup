import { Surreal } from "surrealdb.js";

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

export async function query_one<T>(
    query: string,
    params?: { [k: string]: any }, // eslint-disable-line
): Promise<T[] | null> {
    if (query.includes(";")) {
        throw new Error("query_one does not support multiple queries");
    }
    let result;
    try {
        result = await db.query<T[][]>(query, params);
    } catch (error) {
        console.error(error);
        return null;
    }
    return result[0];
}
