class EmployeePresenter {
  constructor(helper) {
    this.helper = helper;
  }
  presentEmployeeWeb = (employee) => {
    if (employee.manager) {
      return {
        id: employee.id,
        name: employee.name,
        managerId: employee.managerId,
        created_at: this.helper.formatDate(employee.created_at),
        manager: this.presentEmployeeWeb(employee.manager),
      };
    }
    return {
      id: employee.id,
      name: employee.name,
      managerId: employee.managerId,
      created_at: this.helper.formatDate(employee.created_at),
      manager: employee.manager,
    };
  };

  presentEmployeeMobile = (employee) => {
    if (employee.manager) {
      this.presentEmployeeMobile(employee.manager);
    }
    return {
      id: employee.id,
      name: employee.name,
      managerId: employee.managerId,
      created_at: this.helper.formatDate(employee.created_at),
      manager: employee.manager,
    };
  };
}

module.exports = EmployeePresenter;
