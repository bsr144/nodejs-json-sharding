const CustomError = require('../../../utils/error/custom_error');

class ErrorHandlerMiddleware {
  constructor(logger, response) {
    this.logger = logger;
    this.response = response;
  }
  handle = (err, _req, res, _next) => {
    this.logger.error('', err);
    if (err instanceof CustomError) {
      return this.response.sendErrorResponse(res, err.status_code, {
        description: err.description,
        status_code: err.status_code,
        status_message: err.status_message,
        location: err.location,
        type: err.type,
        possible_solutions: err.possible_solutions,
      });
    }

    const errorToBeSent = new CustomError({
      message: err.message,
      status_code: 500,
      type: 'SERVER',
    });

    return this.response.sendErrorResponse(res, 500, {
      description: err.description,
      status_code: errorToBeSent.status_code,
      status_message: errorToBeSent.status_message,
      location: errorToBeSent.location,
      message: errorToBeSent.message,
      type: errorToBeSent.type,
      possible_solutions: errorToBeSent.possible_solutions,
    });
  };
}

module.exports = ErrorHandlerMiddleware;
