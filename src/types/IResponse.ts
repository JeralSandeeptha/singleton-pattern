export interface IResponse {
    statusCode: number;
    message: string;
    data?: Record<string, unknown> | null;
}