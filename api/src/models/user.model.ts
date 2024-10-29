import { RecordId } from "surrealdb";

export type User = {
    id: RecordId;
    created_at: Date;
    email: string;
    password: string;
    username: string;
    verified: boolean;
};
