import { RecordId } from "surrealdb.js";

export type Request = {
    id: RecordId;
    created_at: Date;
    headers: { [key: string]: string };
    response: string;
    response_time: number;
    status: number;
};
