const dotenv = require('dotenv');
const path = require('path');

dotenv.config({
  path: path.resolve(process.cwd(), `envs/.env.${process.env.NODE_ENV}`),
});

const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const config = require('../../config');

// Drivers
const logger = require('../logger/logger.js');
const memoryDatabase = require('../database/memory_db/memory_db.js');

// Adapter Classes
const EmployeeRepository = require('../../adapters/repositories/employee.js');
const EmployeeUsecase = require('../../usecases/employees/employee.js');

// Instantiations
const employeeDatabase1 = new memoryDatabase(config.dbEmployee1);
const employeeDatabase2 = new memoryDatabase(config.dbEmployee2);
const employeeDatabase3 = new memoryDatabase(config.dbEmployee3);

const employeeRepository = new EmployeeRepository(
  employeeDatabase1,
  employeeDatabase2,
  employeeDatabase3,
  logger
);
const employeeUsecase = new EmployeeUsecase(employeeRepository, logger);
