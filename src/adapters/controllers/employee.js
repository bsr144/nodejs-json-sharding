class EmployeeController {
  constructor(employeeUsecase, employeePresenter, response, sanitizer, validator, helper, logger) {
    this.employeeUsecase = employeeUsecase;
    this.employeePresenter = employeePresenter;
    this.response = response;
    this.sanitizer = sanitizer;
    this.validator = validator;
    this.helper = helper;
    this.logger = logger;
  }

  get = async (req, res, next) => {
    let result;
    try {
      if (this.helper.objectIsNotEmpty(req.query)) {
        const validatedQueryParams = this.validator.validateQueryParams(req.query);
        const sanitizedQueryParams = this.sanitizer.sanitizeQueryParams(validatedQueryParams);

        result = await this.employeeUsecase.get(sanitizedQueryParams);

        result.employee = await this.employeePresenter.presentEmployeeWeb(result.employee);
      }

      return this.response.sendSuccessResponse(res, 200, result);
    } catch (error) {
      next(error);
    }
  };

  getAllByAuth = async (_req, _res) => {
    this.logger.info('dummy auth controller');
  };
}

module.exports = EmployeeController;
