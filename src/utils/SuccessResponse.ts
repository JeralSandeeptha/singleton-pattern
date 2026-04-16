import type { IResponse } from "../types/IResponse.js";

class SuccessResponse implements IResponse {

    constructor(
        public statusCode: number,
        public message: string,
        public data: Record<string, unknown> | null = null
    ) { }
}

export default SuccessResponse;
