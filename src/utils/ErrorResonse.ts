import type { IResponse } from "../types/IResponse.js";

class ErrorResponse implements IResponse {

    constructor(
        public statusCode: number,
        public message: string,
        public data: Record<string, unknown> | null = null
    ) { }
}

export default ErrorResponse;