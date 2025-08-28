import winston from "winston";

const logger = winston.createLogger({
  level: "info", // default level
  levels: {
    error: 0,
    warn: 1,
    info: 2,
    http: 3,  // add http level
    debug: 4,
  },
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.colorize(),
    winston.format.printf(({ level, message, timestamp }) => {
      return `[${timestamp}] ${level}: ${message}`;
    })
  ),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: "logs/error.log", level: "error" }),
    new winston.transports.File({ filename: "logs/combined.log" }),
  ],
});

export default logger;
