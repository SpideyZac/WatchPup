import { RecordId } from "surrealdb";

export type Service = {
    id: RecordId;
    created_at: Date;
    method: string;
    name: string;
    url: string;
};
