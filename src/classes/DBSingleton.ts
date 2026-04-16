import mongoose from "mongoose";
import logger from "../config/LoggerConfig.js";

class DBSingleton {
  private static instance: DBSingleton;
  private isConnected: boolean = false;
  private initializedAt: Date;

  private constructor() {
    this.initializedAt = new Date();
  }

  public static getInstance(): DBSingleton {
    if (!DBSingleton.instance) {
      DBSingleton.instance = new DBSingleton();
    }
    return DBSingleton.instance;
  }

  public async connect(): Promise<void> {
    if (this.isConnected) {
      logger.info("Already connected to MongoDB");
      return;
    }

    try {
      await mongoose.connect("mongodb://127.0.0.1:27017/mydatabase");
      this.isConnected = true;
      logger.info("Connected to MongoDB");
    } catch (err) {
      logger.error("Connection error:" + (err as Error).message);
      throw err;
    }
  }

    public getConnectionStatus(): boolean {
      return this.isConnected;
    }

    public getInitializedTime(): Date {
      return this.initializedAt;
    }
}

export default DBSingleton;
