import { RecordId } from "surrealdb.js";

export type Service = {
    id: RecordId;
    body: { [key: string]: string };
    created_at: Date;
    headers: { [key: string]: string };
    method: string;
    name: string;
    url: string;
};
