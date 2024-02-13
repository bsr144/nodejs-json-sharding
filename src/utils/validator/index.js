const configValidationSchema = require('./config');
const queryParamValidationSchema = require('./query_param');
const CustomError = require('../error/custom_error');

const validate = (schema, data) => {
  const { error, value } = schema.validate(data);
  if (error) {
    throw new CustomError({
      type: 'VALIDATION',
      status_code: 400,
      message: error.message,
    });
  }
  return value;
};

class Validator {
  validateConfig = (config) => validate(configValidationSchema, config);

  validateQueryParams = (queryParams) => validate(queryParamValidationSchema, queryParams);
}

module.exports = Validator;
