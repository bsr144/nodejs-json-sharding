const express = require('express');
const employeeRouter = express.Router();

const bootstrapEmployeeRouterV1 = (employeeController, authMiddleware) => {
  // Employee public routes
  attachEmployeePublicRoutesV1(employeeController);

  // Employee private routes
  attachEmployeePrivateRoutesV1(employeeController, authMiddleware);

  return employeeRouter;
};

// Employee public routes v1
const attachEmployeePublicRoutesV1 = (employeeController) => {
  employeeRouter.get(`/`, employeeController.get);
};

// Employee private routes v1
const attachEmployeePrivateRoutesV1 = (employeeController, authMiddleware) => {
  employeeRouter.use(authMiddleware.authenticateIncomingRequest);
  employeeRouter.get(`/auth`, employeeController.getAllByAuth);
};

module.exports = bootstrapEmployeeRouterV1;
