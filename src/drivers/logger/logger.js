const winston = require('winston');

const newLogger = (config) => {
  const transports = [
    new winston.transports.File({ filename: config.logger.errorLogPath, level: 'error' }),
  ];

  if (process.env.NODE_ENV !== 'production') {
    transports.push(
      new winston.transports.Console({
        format: winston.format.simple(),
      })
    );
  }

  const logger = winston.createLogger({
    level: config.logger.level,
    format: winston.format.json(),
    transports: transports,
  });

  return logger;
};

module.exports = {
  newLogger,
};
