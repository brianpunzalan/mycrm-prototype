const winston = require('winston');
require('winston-daily-rotate-file');

let loggerInstance = null;

module.exports = (options = {}) => {
  const format = options.format || 'YYYY-MM-DD HH:mm:ss';
  const label = options.label || 'APP';
  const level = options.level || 'info';
  const service = options.service || 'core';
  const dailyRotateFileOptions = options.dailyRotateFileOptions || {};

  // Return the singleton instance
  if (loggerInstance !== null) {
    return loggerInstance;
  }

  const dailyRotateFileCommons = {
    datePattern: 'YYYY-MM-DD',
    zippedArchive: false,
    maxSize: '20m',
    maxFiles: '3d',
    ...dailyRotateFileOptions,
  };

  loggerInstance = winston.createLogger({
    level,
    format: winston.format.combine(
      winston.format.splat(),
      winston.format.label({ label }),
      winston.format.timestamp({
        format,
      }),
      winston.format.json(),
      winston.format.printf(({ timestamp, message, ...others }) => {
        const data = JSON.stringify(others);
        return `${timestamp} [${label}] ${level}: ${message} ${data}`;
      }),
    ),
    defaultMeta: { service },
    transports: [
      new (winston.transports.DailyRotateFile)({
        filename: './logs/error-%DATE%.log',
        level: 'error',
        ...dailyRotateFileCommons,
      }),
      new (winston.transports.DailyRotateFile)({
        filename: './logs/info-%DATE%.log',
        level: 'info',
        ...dailyRotateFileCommons,
      }),
      new (winston.transports.DailyRotateFile)({
        filename: './logs/http-%DATE%.log',
        level: 'http',
        ...dailyRotateFileCommons,
      }),
      new (winston.transports.DailyRotateFile)({
        filename: './logs/debug-%DATE%.log',
        ...dailyRotateFileCommons,
      }),
    ],
  });

  //
  // If we're not in production then log to the `console` with the format:
  // `${info.level}: ${info.message} JSON.stringify({ ...rest }) `
  //
  if (process.env.NODE_ENV !== 'production') {
    loggerInstance.add(new winston.transports.Console({
      format: winston.format.simple(),
    }));
  }

  loggerInstance.info('Logger instance was instantiated.');

  return loggerInstance;
};
