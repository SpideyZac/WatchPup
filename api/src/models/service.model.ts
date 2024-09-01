export type Service = {
    id: string;
    body: { [key: string]: string };
    created_at: Date;
    headers: { [key: string]: string };
    method: string;
    name: string;
    url: string;
};
