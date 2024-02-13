// driver classes
const MemoryDB = require('../database/memory_db/memory_db');

// util classes
const Validator = require('../../utils/validator');
const Sanitizer = require('../../utils/sanitizer');
const Helper = require('../../utils/helper');
const Response = require('../../utils/response');

// repository classes
const EmployeeRepository = require('../../adapters/repositories/employee');

// usecase classes
const EmployeeUsecase = require('../../usecases/employees/employee');

// controller classes
const EmployeeController = require('../../adapters/controllers/employee');

// presenter classes
const EmployeePresenter = require('../../adapters/presenters/employee');

// middleware classes
const AuthMiddleware = require('./middlewares/auth');
const HttpMiddleware = require('./middlewares/http');
const ErrorHandlerMiddleware = require('./middlewares/error_handler');

// router class
const Router = require('./routes');

// utils instantiation
const validator = new Validator();
const sanitizer = new Sanitizer();
const helper = new Helper();
const response = new Response();

const config = require('../../config').newConfig(validator);

// drivers instantiation and factory
const logger = require('../../drivers/logger/logger').newLogger(config);
const employeeDb1 = new MemoryDB(config.dbEmployee1);
const employeeDb2 = new MemoryDB(config.dbEmployee2);
const employeeDb3 = new MemoryDB(config.dbEmployee3);

// presenters instantiation
const employeePresenter = new EmployeePresenter(helper);

// repositories instantiation
const employeeRepositories = new EmployeeRepository(employeeDb1, employeeDb2, employeeDb3, logger);

// usecases instantiation
const employeeUsecase = new EmployeeUsecase(employeeRepositories, logger);

// controllers instantiation
const employeeController = new EmployeeController(
  employeeUsecase,
  employeePresenter,
  response,
  sanitizer,
  validator,
  helper,
  logger
);

// middlewares instantiation
const authMiddleware = new AuthMiddleware(logger);
const errorHandlerMiddleware = new ErrorHandlerMiddleware(logger, response);
const httpMiddleware = new HttpMiddleware();

// routes instantiation
const router = new Router(employeeController, authMiddleware);

// express initialization
const express = require('express');
const app = express();
const compression = require('compression');
const helmet = require('helmet');
const morgan = require('morgan');

app.use(express.json());
app.use(compression());
app.use(helmet());

if (process.env.NODE_ENV === 'development') app.use(morgan('dev'));
else app.use(morgan('combined'));

app.use(httpMiddleware.limitRate);

router.setupV1Routes(app);

app.use(errorHandlerMiddleware.handle);

const server = app.listen(config.http.port, () =>
  console.log(`Listening on port ${config.http.port}`)
);

const runGracefulShutdown = (signal) => {
  console.log(`Shutting down the server gracefully due to ${signal}`);

  const shutdownTimeout = setTimeout(() => {
    console.error('Forcing server shutdown');
    process.exit(1);
  }, config.shutdown.timeout);

  server.close((err) => {
    clearTimeout(shutdownTimeout);
    if (err) {
      console.error('Error during server shutdown', err);
      process.exit(1);
    }
    console.log('Server is closed');

    process.exit(0);
  });
};

process.on('SIGTERM', () => runGracefulShutdown('SIGTERM'));
process.on('SIGINT', () => runGracefulShutdown('SIGINT'));

module.exports = app;
