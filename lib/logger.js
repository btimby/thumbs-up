/* eslint-disable no-param-reassign */

const os = require('os');
const winston = require('winston');
const Sentry = require('winston-transport-sentry-node').default;

const serviceName = process.env.SERVICE_NAME || 'activity';
const LOG_LEVEL = process.env.LOG_LEVEL || 'warn';
const HOSTNAME = process.env.HOSTNAME || os.hostname();

const enumerateErrorFormat = winston.format((info) => {
  if (info.message instanceof Error) {
    info.message = {
      ...info.message,
      message: info.message.message,
      stack: info.message.stack,
    };
  }

  if (info instanceof Error) {
    return {
      ...info,
      message: info.message,
      stack: info.stack,
    };
  }

  return info;
});

const fmt = winston.format.printf(({
  level, message, label, timestamp, stack,
}) => {
  const stackMsg = (stack) ? `\n${stack}` : '';
  return `${timestamp} [${label}] ${level}: ${message}${stackMsg}`;
});

const logger = winston.createLogger({
  level: LOG_LEVEL,
  format: winston.format.combine(
    winston.format.label({ label: serviceName }),
    winston.format.timestamp(),
    enumerateErrorFormat(),
    fmt,
  ),
  transports: [
    new winston.transports.Console({
      level: LOG_LEVEL,
    }),
  ],
});

if (process.env.SENTRY_DSN) {
  logger.add(new Sentry({
    level: 'error',
    sentry: {
      dsn: process.env.SENTRY_DSN,
      serverName: HOSTNAME,
    },
  }));
}

module.exports = logger;
