import pino from "pino";

class LoggerSingleton {
  private static instance: LoggerSingleton;
  private initializedAt: Date;
  private logger: pino.Logger;

  private constructor() {
    this.initializedAt = new Date();
    this.logger = pino({
      transport: {
        target: "pino-pretty",
        options: {
          colorize: true,
          translateTime: "SYS:standard",
          ignore: "pid,hostname",
        },
      },
    });
  }

  public getInitializationTime(): Date {
    return this.initializedAt;
  }

  public static getInstance(): LoggerSingleton {
    if (!LoggerSingleton.instance) {
      LoggerSingleton.instance = new LoggerSingleton();
    }
    return LoggerSingleton.instance;
  }

  public info(message: string): void {
    this.logger.info(`${message}`);
  }

  public error(message: string): void {
    this.logger.error(`${message}`);
  }

  public warn(message: string): void {
    this.logger.warn(`${message}`);
  }

  public debug(message: string): void {
    this.logger.debug(`${message}`);
  }
}

export default LoggerSingleton;
