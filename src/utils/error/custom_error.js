const errorConstants = require('../constants/error');

const mapErrorNamesByType = (type) => {
  return errorConstants.custom_error.type[type];
};

const mapStatusCodeToMessage = (statusCode) => {
  const statusMessages = {
    100: 'Continue',
    101: 'Switching Protocols',
    200: 'OK',
    201: 'Created',
    202: 'Accepted',
    204: 'No Content',
    301: 'Moved Permanently',
    302: 'Found',
    304: 'Not Modified',
    400: 'Bad Request',
    401: 'Unauthorized',
    403: 'Forbidden',
    404: 'Not Found',
    500: 'Internal Server Error',
    501: 'Not Implemented',
  };

  return statusMessages[statusCode] || 'Unknown Status Code';
};

const mapTypeToPossibleSolutions = (type) => {
  if (type === 'CLIENT') {
    return [
      `check the corresponding usecase related to this service`,
      `user input could be in wrong format`,
      `data already fetched but it doesn't comply with the business rules`,
      `make sure that the value you are passing is already inline with the requirements`,
    ];
  } else if (type === 'SERVER') {
    return [`check the 'error_location' stack, trace the error from the given files`];
  } else if (type === 'DATABASE') {
    return [
      `check the 'error_location' stack, trace the error from the given files`,
      `check the query related to this request`,
    ];
  } else if (type === 'VALIDATION') {
    return [
      `check the 'error_location' stack, trace the error from the given files`,
      `check whether the respective Joi object or type is already correct or not`,
      `make sure you pass the Joi instance, not primitive object`,
      `make sure that the value you are passing is already inline with the requirements`,
    ];
  }
};

class CustomError extends Error {
  constructor(errorObjInput) {
    super(errorObjInput.message);
    this.description = errorObjInput.message;
    this.success = false;
    this.type = mapErrorNamesByType(errorObjInput.type);
    this.status_message = mapStatusCodeToMessage(errorObjInput.status_code);
    this.location = this.stack
      .split('\n')
      .slice(1, 5)
      .map((eachStack) => eachStack.trim());
    this.status_code = errorObjInput.status_code;
    this.possible_solutions =
      errorObjInput.possible_solutions || mapTypeToPossibleSolutions(errorObjInput.type);
  }
}

module.exports = CustomError;
