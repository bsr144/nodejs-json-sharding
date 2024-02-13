const Joi = require('joi');

module.exports = Joi.object({
  dbEmployee1: Joi.object({
    dbname: Joi.string().required(),
    username: Joi.string().required(),
    host: Joi.string().required(),
    password: Joi.string().required(),
  }),
  dbEmployee2: Joi.object({
    dbname: Joi.string().required(),
    username: Joi.string().required(),
    host: Joi.string().required(),
    password: Joi.string().required(),
  }),
  dbEmployee3: Joi.object({
    dbname: Joi.string().required(),
    username: Joi.string().required(),
    host: Joi.string().required(),
    password: Joi.string().required(),
  }),
  grpc: Joi.object({
    port: Joi.number().required(),
  }),
  http: Joi.object({
    port: Joi.number().required(),
  }),
  logger: Joi.object({
    level: Joi.string().required(),
    errorLogPath: Joi.string().required(),
  }),
  shutdown: Joi.object({
    timeout: Joi.number().required(),
  }),
});
