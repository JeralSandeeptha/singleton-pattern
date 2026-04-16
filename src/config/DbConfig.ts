import DBSingleton from "../classes/DBSingleton.js";

export const db = DBSingleton.getInstance();

export const connectToDatabase = async (): Promise<void> => {
    try {
        await db.connect();
    } catch (err) {
        throw err;
    }
}