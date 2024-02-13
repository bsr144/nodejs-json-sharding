const bootstrapEmployeeRouterV1 = require('./employee');

class Router {
  #v1Api;
  constructor(employeeController, authMiddleware) {
    // route strings
    this.#v1Api = '/api/v1';

    // handlers
    this.employeeController = employeeController;
    this.authMiddleware = authMiddleware;
  }

  setupRoutes = (app) => {
    this.setupV1Routes(app);
  };

  setupV1Routes = (app) => {
    const employeeRoutesV1 = bootstrapEmployeeRouterV1(
      this.employeeController,
      this.authMiddleware
    );

    app.use(`${this.#v1Api}/employees`, employeeRoutesV1);
  };
}

module.exports = Router;
