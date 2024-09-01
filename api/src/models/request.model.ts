export type Request = {
    id: string;
    created_at: Date;
    headers: { [key: string]: string };
    response: string;
    response_time: number;
    status: number;
};
