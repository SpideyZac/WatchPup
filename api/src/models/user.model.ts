import { RecordId } from "surrealdb.js";

export type User = {
    id: RecordId;
    created_at: Date;
    email: string;
    password: string;
    username: string;
    verified: boolean;
};
