import { connectToDatabase, db } from "./config/DbConfig.js";
import express from "express";
import logger from "./config/LoggerConfig.js";
import ErrorResponse from "./utils/ErrorResonse.js";
import SuccessResponse from "./utils/SuccessResponse.js";

const app: express.Application = express();
const port = 8800;

app.get("/database", async (req: express.Request, res: express.Response) => {
    try {
        const initializedTime = await db.getInitializedTime();
        const connection = await db.connect()
                                    .then(() => db.getConnectionStatus())
                                        .catch((err) => {
                                            throw err;
                                        });
        res.status(200).json(new SuccessResponse(200, "Database connection successful", { "connected": connection, "initializedAt": initializedTime }));
    } catch (err) {
        res.status(500).json(new ErrorResponse(500, "Connection error: " + (err instanceof Error ? err.message : String(err)), { "error": (err instanceof Error ? err.message : String(err)) }));
    }
});

app.listen(port, async () => {
    await connectToDatabase();
    logger.info(`Server is running on http://localhost:${port}`);
});
