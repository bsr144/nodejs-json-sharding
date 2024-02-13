const dbEmployee1Config = require('./db_employee_1');
const dbEmployee2Config = require('./db_employee_2');
const dbEmployee3Config = require('./db_employee_3');
const grpcConfig = require('./grpc');
const httpConfig = require('./http');
const loggerConfig = require('./logger');
const shutdownConfig = require('./shutdown');

const newConfig = (validator) => {
  const config = {
    dbEmployee1: dbEmployee1Config,
    dbEmployee2: dbEmployee2Config,
    dbEmployee3: dbEmployee3Config,
    grpc: grpcConfig,
    http: httpConfig,
    logger: loggerConfig,
    shutdown: shutdownConfig,
  };

  return validator.validateConfig(config);
};

module.exports = {
  newConfig,
};
