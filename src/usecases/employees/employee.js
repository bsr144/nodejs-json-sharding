const CustomError = require('../../utils/error/custom_error');

class EmployeeUsecase {
  constructor(employeeRepository, logger) {
    this.employeeRepository = employeeRepository;
    this.logger = logger;
  }

  get = async (queryRequests) => {
    try {
      const employees = await this.employeeRepository.get(queryRequests);

      if (this.#isEmployeeNotExist(employees)) {
        throw Error(`employee named ${queryRequests.name} does not exist`);
      }

      const uniqueEmployees = this.#getUniqueData(employees);

      if (this.#isEmployeeHavingMultipleManagers(uniqueEmployees)) {
        throw Error(`${queryRequests.name} is having two managers`);
      }

      const employee = uniqueEmployees[0];

      if (this.#isEmployeeHasManager(employee)) {
        throw Error(`Unable to process, ${queryRequests.name} not having any hierarchy`);
      }

      return { employee: employee, total_manager: this.#countEmployeeManagers(employee) };
    } catch (error) {
      throw new CustomError({
        type: 'CLIENT',
        status_code: 400,
        message: error.message,
      });
    }
  };

  #getUniqueData = (employees) => {
    const uniqueData = {};

    employees.forEach((eachData) => {
      const key = eachData.name + '-' + eachData.managerId;
      if (!uniqueData[key]) {
        uniqueData[key] = eachData;
      }
    });

    return Object.values(uniqueData);
  };

  #isEmployeeHavingMultipleManagers = (employees) => employees.length > 1;

  #isEmployeeNotExist = (employees) => employees.length === 0;

  #isEmployeeHasManager = (employee) => employee.managerId === null;

  #countEmployeeManagers = (employee) => {
    let count = 0;
    function counting(employee) {
      if (employee.manager) {
        count++;
        counting(employee.manager);
      }
      return count;
    }

    return counting(employee);
  };
}

module.exports = EmployeeUsecase;
