const queries = require('../../utils/constants/queries');
const Employee = require('../../entities/employee');

class EmployeeRepository {
  constructor(employeeDatabase1, employeeDatabase2, employeeDatabase3, logger) {
    this.employeeDatabase1 = employeeDatabase1;
    this.employeeDatabase2 = employeeDatabase2;
    this.employeeDatabase3 = employeeDatabase3;
    this.logger = logger;
  }

  get = async (queryRequests) => {
    const queryRequestWithWhereName = `${queries.employee.SELECT_ALL_QUERY_WITH_WHERE} name = '${queryRequests.name}';`;

    const [employees1, employees2, employees3] = await Promise.all([
      this.employeeDatabase1.executeQuery(queryRequestWithWhereName),
      this.employeeDatabase2.executeQuery(queryRequestWithWhereName),
      this.employeeDatabase3.executeQuery(queryRequestWithWhereName),
    ]);

    const fetchedEmployeeResult = [
      await this.#scan(employees1),
      await this.#scan(employees2),
      await this.#scan(employees3),
    ];

    const lazyLoadedEmployeeResult = [
      await this.#lazyLoadHierarchies(fetchedEmployeeResult[0], 'database1'),
      await this.#lazyLoadHierarchies(fetchedEmployeeResult[1], 'database2'),
      await this.#lazyLoadHierarchies(fetchedEmployeeResult[2], 'database3'),
    ];

    const tidiedResult = [
      ...lazyLoadedEmployeeResult[0],
      ...lazyLoadedEmployeeResult[1],
      ...lazyLoadedEmployeeResult[2],
    ];

    return tidiedResult;
  };

  #scan = async (employees) =>
    employees.map(
      (eachEmployee) =>
        new Employee(
          eachEmployee.id,
          eachEmployee.name,
          eachEmployee.managerId,
          eachEmployee.created_at
        )
    );

  #lazyLoadHierarchies = async (employees, databaseName) => {
    for (let index = 0; index < employees.length; index++) {
      employees[index] = await this.#loadHierarchy(employees[index], databaseName);
    }
    return employees;
  };

  #loadHierarchy = async (employee, databaseName) => {
    if (employee.hasManager()) {
      const queryRequestWithWhereId = `${queries.employee.SELECT_ALL_QUERY_WITH_WHERE} id = ${employee.managerId};`;
      let result;
      if (databaseName === 'database1') {
        result = await this.employeeDatabase1.executeQuery(queryRequestWithWhereId);
        result = await this.#scan(result);
      } else if (databaseName === 'database2') {
        result = await this.employeeDatabase2.executeQuery(queryRequestWithWhereId);
        result = await this.#scan(result);
      } else if (databaseName === 'database3') {
        result = await this.employeeDatabase3.executeQuery(queryRequestWithWhereId);
        result = await this.#scan(result);
      }

      employee.setManager(result[0]);
      this.#loadHierarchy(employee.manager, databaseName);
    }
    return employee;
  };
}

module.exports = EmployeeRepository;
