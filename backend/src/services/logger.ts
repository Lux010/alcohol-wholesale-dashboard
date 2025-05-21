import config from "../config/config";
import { createLogger, format, transports } from "winston";

const { combine, timestamp, prettyPrint } = format;

export const logger = createLogger({
  level: config.env.logLevel,
  format: combine(timestamp(), format.json()),
  transports: [
    //
    // - Write all logs with importance level of `error` or less to `error.log`
    // - Write all logs with importance level of `info` or less to `status.log`
    //
    new transports.File({ filename: "logs/error.log", level: "error" }),
    new transports.File({ filename: "logs/status.log" }),
  ],
  exceptionHandlers: [new transports.File({ filename: "logs/exceptions.log" })],
});

if (config.env.nodeEnv !== "production") {
  logger.add(
    new transports.Console({
      format: combine(
        timestamp(),
        format.printf((info) => {
          const { timestamp, level, message, ...rest } = info;
          return `${timestamp} [${level.toUpperCase()}]: ${message} ${
            Object.keys(rest).length ? JSON.stringify(rest, null, 2) : ""
          }`;
        })
      ),
    })
  );
}
